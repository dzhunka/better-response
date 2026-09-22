import {
  access,
  cp,
  mkdir,
  readFile,
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
const cursorExecutable = "/Applications/Cursor.app/Contents/MacOS/Cursor";
const sourceDist = path.join(
  repositoryRoot,
  "plugins",
  "better-response",
  "dist",
);
const sourceSkill = path.join(
  sourceDist,
  "skills",
  "visualize",
  "SKILL.md",
);
const localMcpUrl = "http://127.0.0.1:3100/api/mcp";
const isolatedRoot = path.join(homedir(), ".better-response", "cursor-dev");
const isolatedUserData = path.join(isolatedRoot, "user-data");
const isolatedExtensions = path.join(isolatedRoot, "extensions");
const cachedPlugin = path.join(
  homedir(),
  ".cursor",
  "plugins",
  "local",
  "better-response",
);
const cachedSkill = path.join(
  cachedPlugin,
  "skills",
  "visualize",
  "SKILL.md",
);

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
      throw new Error(
        `Better Response development server exited with code ${child.exitCode}.`,
      );
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

async function writeLocalMcpConfig() {
  const mcpServers = {
    visualize: {
      type: "http",
      url: localMcpUrl,
    },
  };

  await writeFile(
    path.join(cachedPlugin, ".mcp.json"),
    `${JSON.stringify({ mcpServers }, null, 2)}\n`,
  );

  const pluginManifestPath = path.join(
    cachedPlugin,
    ".cursor-plugin",
    "plugin.json",
  );
  const pluginManifest = JSON.parse(await readFile(pluginManifestPath, "utf8"));
  pluginManifest.mcpServers = mcpServers;
  await writeFile(
    pluginManifestPath,
    `${JSON.stringify(pluginManifest, null, 2)}\n`,
  );
}

async function restoreProductionPlugin() {
  await rm(cachedPlugin, { recursive: true, force: true });
  await mkdir(path.dirname(cachedPlugin), { recursive: true });
  await cp(sourceDist, cachedPlugin, { recursive: true });
}

await access(cursorExecutable);
await access(sourceDist);
await access(sourceSkill);

console.log("Building the hosted Better Response MCP App...");
await run("pnpm", ["--filter", "@better-response/web", "build:mcp-app"]);

const developmentWatchFiles = [];
let developmentServer;
let skillUpdateQueue = Promise.resolve();

try {
  await Promise.all([
    mkdir(isolatedUserData, { recursive: true }),
    mkdir(isolatedExtensions, { recursive: true }),
  ]);

  console.log(
    "Installing Better Response into Cursor's local plugins with a localhost MCP URL...",
  );
  await restoreProductionPlugin();
  await writeLocalMcpConfig();

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
        await cp(sourceSkill, cachedSkill);
        console.log(
          "[Better Response] SKILL.md updated. Start a new agent chat to load it.",
        );
      })
      .catch((error) => {
        console.error(`[Better Response] Skill refresh failed: ${error.message}`);
      });
  });

  console.log(
    "Starting the Better Response development loop at http://127.0.0.1:3100...",
  );
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

  const resolvedUserData = await realpath(isolatedUserData);
  const resolvedExtensions = await realpath(isolatedExtensions);

  console.log(`Isolated Cursor user data: ${resolvedUserData}`);
  console.log(
    "Launching a separate Cursor desktop instance against local HTTP...",
  );
  console.log(
    "Sign in once if prompted; this profile persists under ~/.better-response/cursor-dev.",
  );
  console.log("Close that instance to stop the local development server.");

  await run(cursorExecutable, [
    `--user-data-dir=${resolvedUserData}`,
    `--extensions-dir=${resolvedExtensions}`,
    repositoryRoot,
  ]);

  for (const file of developmentWatchFiles) {
    unwatchFile(file);
  }
  await stopDevelopmentServer(developmentServer);
  await skillUpdateQueue;
  await restoreProductionPlugin();
  console.log(
    "Stopped the local development server and restored the production local plugin. Isolated Cursor profile kept for the next run.",
  );
} catch (error) {
  for (const file of developmentWatchFiles) {
    unwatchFile(file);
  }
  await stopDevelopmentServer(developmentServer);
  throw error;
}
