import {
  access,
  chmod,
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  realpath,
  rm,
  writeFile,
} from "node:fs/promises";
import { unwatchFile, watchFile } from "node:fs";
import { homedir } from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { stopDevelopmentServer } from "./dev-web.mjs";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const codexCli = "/Applications/ChatGPT.app/Contents/Resources/codex";
const chatGptExecutable =
  "/Applications/ChatGPT.app/Contents/MacOS/ChatGPT";
const sourceCodexHome =
  process.env.CODEX_HOME?.trim() || path.join(homedir(), ".codex");
const sourceAuth = path.join(sourceCodexHome, "auth.json");
const sourceSkill = path.join(
  repositoryRoot,
  "plugins",
  "better-response",
  "dist",
  "skills",
  "visualize",
  "SKILL.md",
);
const seedThreadFixturesRoot = path.join(
  repositoryRoot,
  "scripts",
  "fixtures",
);
const seedThreadCwd = path.join(homedir(), "Documents", "Codex");

async function listSeedThreadFixtures() {
  const entries = await readdir(seedThreadFixturesRoot, {
    withFileTypes: true,
  });
  const fixtures = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    if (!entry.name.startsWith("codex-dev-seed-thread-")) continue;

    const dir = path.join(seedThreadFixturesRoot, entry.name);
    const metaPath = path.join(dir, "meta.json");
    const rolloutPath = path.join(dir, "rollout.jsonl");
    await access(metaPath);
    await access(rolloutPath);
    fixtures.push({
      name: entry.name,
      metaPath,
      rolloutPath,
      meta: JSON.parse(await readFile(metaPath, "utf8")),
    });
  }

  fixtures.sort((a, b) => a.name.localeCompare(b.name));
  if (fixtures.length === 0) {
    throw new Error(
      `No codex-dev-seed-thread-* fixtures found under ${seedThreadFixturesRoot}.`,
    );
  }

  return fixtures;
}

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: repositoryRoot,
      stdio: "inherit",
      ...options,
    });

    child.once("error", reject);
    child.once("close", (code, signal) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(
        new Error(
          `${command} exited ${signal ? `from ${signal}` : `with code ${code}`}`,
        ),
      );
    });
  });
}

async function waitForEndpoint(url, child) {
  const deadline = Date.now() + 30_000;

  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`Better Response development server exited with code ${child.exitCode}.`);
    }

    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // The development server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  throw new Error("Timed out waiting for the Better Response development server.");
}

async function seedDevelopmentThreads(isolatedCodexHome, isolatedEnvironment) {
  const fixtures = await listSeedThreadFixtures();
  const now = new Date();
  const datePath = [
    now.getUTCFullYear(),
    String(now.getUTCMonth() + 1).padStart(2, "0"),
    String(now.getUTCDate()).padStart(2, "0"),
  ].join("/");
  const sessionDir = path.join(isolatedCodexHome, "sessions", datePath);
  await mkdir(sessionDir, { recursive: true });

  const projectlessThreadIds = [];
  const workspaceHints = {};
  const descriptions = {};
  const sessionIndexLines = [];

  for (const fixture of fixtures) {
    const { meta, rolloutPath } = fixture;
    const threadId = meta.threadId;
    const stamp = [
      datePath.replaceAll("/", "-"),
      "T",
      String(now.getUTCHours()).padStart(2, "0"),
      "-",
      String(now.getUTCMinutes()).padStart(2, "0"),
      "-",
      String(now.getUTCSeconds()).padStart(2, "0"),
    ].join("");
    const rollout = (await readFile(rolloutPath, "utf8"))
      .replaceAll(meta.codexHomePlaceholder, isolatedCodexHome)
      .replaceAll(meta.cwdPlaceholder, seedThreadCwd);

    await writeFile(
      path.join(sessionDir, `rollout-${stamp}-${threadId}.jsonl`),
      rollout,
    );
    projectlessThreadIds.push(threadId);
    workspaceHints[threadId] = seedThreadCwd;
    descriptions[threadId] =
      meta.description || meta.threadName || meta.userMessage;
    sessionIndexLines.push(
      JSON.stringify({
        id: threadId,
        thread_name: meta.threadName,
        updated_at: now.toISOString(),
      }),
    );

    console.log(
      `Seeding development thread "${meta.threadName}" (${threadId})...`,
    );
  }

  await writeFile(
    path.join(isolatedCodexHome, "session_index.jsonl"),
    `${sessionIndexLines.join("\n")}\n`,
  );
  await writeFile(
    path.join(isolatedCodexHome, ".codex-global-state.json"),
    JSON.stringify({
      "projectless-thread-ids": projectlessThreadIds,
      "thread-workspace-root-hints": workspaceHints,
      "electron-persisted-atom-state": {
        "chatgpt-migration-announcement-completed-v1": true,
        "electron:onboarding-projectless-completed": true,
        "electron:onboarding-hide-first-new-thread-promos": true,
        "thread-descriptions-v1": descriptions,
      },
    }),
    { mode: 0o600 },
  );

  for (const fixture of fixtures) {
    await run(
      codexCli,
      [
        "migrate-rollouts",
        "--apply",
        "--thread",
        fixture.meta.threadId,
        "--json",
      ],
      { env: isolatedEnvironment },
    );
  }

  return fixtures.map((fixture) => fixture.meta.threadId);
}

await Promise.all([
  access(codexCli),
  access(chatGptExecutable),
  access(sourceAuth),
]);
await listSeedThreadFixtures();

console.log("Building the hosted Better Response MCP App...");
await run("pnpm", ["--filter", "@better-response/web", "build:mcp-app"]);

// Keep this path short. Codex binds `$CODEX_HOME/ipc/ipc.sock`, and macOS
// unix-socket paths are capped around 104 bytes. `os.tmpdir()` on macOS is
// `/var/folders/...`, which overflows and makes the isolated instance miss
// CLI-installed plugins.
const isolatedRoot = await realpath(await mkdtemp("/tmp/br-"));
const isolatedCodexHome = path.join(isolatedRoot, "codex-home");
const isolatedUserData = path.join(isolatedRoot, "electron");
let appLaunchStarted = false;
const developmentWatchFiles = [];
let developmentServer;
let skillUpdateQueue = Promise.resolve();

try {
  await Promise.all([
    mkdir(isolatedCodexHome),
    mkdir(isolatedUserData),
  ]);
  await copyFile(sourceAuth, path.join(isolatedCodexHome, "auth.json"));
  await chmod(path.join(isolatedCodexHome, "auth.json"), 0o600);
  await writeFile(
    path.join(isolatedCodexHome, ".codex-global-state.json"),
    JSON.stringify({
      "electron-persisted-atom-state": {
        "chatgpt-migration-announcement-completed-v1": true,
        "electron:onboarding-projectless-completed": true,
        "electron:onboarding-hide-first-new-thread-promos": true,
      },
    }),
    { mode: 0o600 },
  );

  const isolatedEnvironment = {
    ...process.env,
    CODEX_HOME: isolatedCodexHome,
  };

  console.log("Verifying the isolated Codex login...");
  await run(codexCli, ["login", "status"], {
    env: isolatedEnvironment,
  });

  console.log(
    "Installing Better Response as the isolated instance's only local plugin...",
  );
  await run(
    codexCli,
    ["plugin", "marketplace", "add", repositoryRoot, "--json"],
    { env: isolatedEnvironment },
  );
  await run(
    codexCli,
    ["plugin", "add", "better-response@better-response-local", "--json"],
    { env: isolatedEnvironment },
  );

  const cachedVersions = (
    await readdir(
      path.join(
        isolatedCodexHome,
        "plugins",
        "cache",
        "better-response-local",
        "better-response",
      ),
      { withFileTypes: true },
    )
  ).filter((entry) => entry.isDirectory());

  if (cachedVersions.length !== 1) {
    throw new Error(
      `Expected one isolated Better Response cache entry, found ${cachedVersions.length}.`,
    );
  }

  const cachedPlugin = path.join(
    isolatedCodexHome,
    "plugins",
    "cache",
    "better-response-local",
    "better-response",
    cachedVersions[0].name,
  );
  const cachedSkill = path.join(
    cachedPlugin,
    "skills",
    "visualize",
    "SKILL.md",
  );

  await writeFile(
    path.join(cachedPlugin, ".mcp.json"),
    `${JSON.stringify(
      {
        mcpServers: {
          visualize: {
            type: "http",
            url: "http://127.0.0.1:3100/api/mcp",
          },
        },
      },
      null,
      2,
    )}\n`,
  );

  await seedDevelopmentThreads(isolatedCodexHome, isolatedEnvironment);

  developmentWatchFiles.push(sourceSkill);
  watchFile(sourceSkill, { interval: 300 }, (current, previous) => {
    if (
      current.mtimeMs === previous.mtimeMs &&
      current.size === previous.size
    ) {
      return;
    }

    skillUpdateQueue = skillUpdateQueue
      .catch(() => {})
      .then(async () => {
        await copyFile(sourceSkill, cachedSkill);
        console.log(
          "[Better Response] SKILL.md updated. Start a new task to load it.",
        );
      })
      .catch((error) => {
        console.error(`[Better Response] Skill refresh failed: ${error.message}`);
      });
  });

  console.log("Starting the Better Response development loop at http://127.0.0.1:3100...");
  developmentServer = spawn(
    "pnpm",
    ["--filter", "@better-response/web", "dev"],
    {
      cwd: repositoryRoot,
      env: {
        ...process.env,
        NEXT_TELEMETRY_DISABLED: "1",
        PORT: "3100",
      },
      stdio: "inherit",
    },
  );
  await waitForEndpoint("http://127.0.0.1:3100", developmentServer);

  console.log(`Isolated Codex home: ${isolatedCodexHome}`);
  console.log(
    "Launching a separate Codex desktop instance against local HTTP...",
  );
  console.log(
    "Open a seeded thread: beef shopping list, or Cube Attain (cut before the markdown table) then /visualize.",
  );
  console.log("Close that instance to remove its temporary state.");

  appLaunchStarted = true;
  await run(
    chatGptExecutable,
    [`--user-data-dir=${isolatedUserData}`],
    {
      env: {
        ...process.env,
        CODEX_HOME: isolatedCodexHome,
        CODEX_ELECTRON_USER_DATA_PATH: isolatedUserData,
      },
    },
  );

  for (const file of developmentWatchFiles) {
    unwatchFile(file);
  }
  await stopDevelopmentServer(developmentServer);
  await skillUpdateQueue;
  await rm(isolatedRoot, { recursive: true, force: true });
  console.log("Removed the isolated Codex environment.");
} catch (error) {
  for (const file of developmentWatchFiles) {
    unwatchFile(file);
  }
  await stopDevelopmentServer(developmentServer);
  if (!appLaunchStarted) {
    await rm(isolatedRoot, { recursive: true, force: true });
  } else {
    console.error(`Preserved isolated state at ${isolatedRoot}`);
  }
  throw error;
}
