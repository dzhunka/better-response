import { execFileSync, spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
export const webAppRoot = path.join(repositoryRoot, "apps", "better-response");

export function pidAlive(pid) {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch {
    return false;
  }
}

function childPids(pid) {
  try {
    return execFileSync("pgrep", ["-P", String(pid)], { encoding: "utf8" })
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .map(Number)
      .filter((child) => Number.isInteger(child) && child > 0);
  } catch {
    return [];
  }
}

function processCommand(pid) {
  try {
    return execFileSync("ps", ["-p", String(pid), "-o", "command="], {
      encoding: "utf8",
    }).trim();
  } catch {
    return "";
  }
}

export function collectProcessTree(pid, seen = new Set()) {
  if (!Number.isInteger(pid) || pid <= 0 || seen.has(pid)) return [];
  seen.add(pid);
  const tree = [];
  for (const child of childPids(pid)) {
    tree.push(...collectProcessTree(child, seen));
  }
  tree.push(pid);
  return tree;
}

export async function stopProcessTree(pid) {
  if (!pidAlive(pid)) return;

  const tree = collectProcessTree(pid);
  for (const child of tree) {
    try {
      process.kill(child, "SIGTERM");
    } catch {
      // already exited
    }
  }

  const deadline = Date.now() + 3_000;
  while (Date.now() < deadline && tree.some(pidAlive)) {
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  for (const child of collectProcessTree(pid)) {
    if (!pidAlive(child)) continue;
    try {
      process.kill(child, "SIGKILL");
    } catch {
      // already exited
    }
  }
}

export async function stopNextDevLock(appRoot = webAppRoot) {
  const nextLockPath = path.join(appRoot, ".next", "dev", "lock");
  let lock;
  try {
    lock = JSON.parse(await readFile(nextLockPath, "utf8"));
  } catch {
    return;
  }

  const pid = Number(lock.pid);
  if (!pidAlive(pid)) return;

  const command = processCommand(pid);
  if (!/\bnext-server\b/.test(command) && !/\bnext\s+dev\b/.test(command)) {
    return;
  }

  const port = lock.port ? ` on port ${lock.port}` : "";
  console.log(
    `Stopping leftover Next.js dev server (pid ${pid}${port}).`,
  );
  await stopProcessTree(pid);
}

export async function stopDevelopmentServer(child) {
  if (child?.pid) {
    await stopProcessTree(child.pid);
  }
  await stopNextDevLock();
}

async function main() {
  await stopNextDevLock();

  const bin = path.join(webAppRoot, "node_modules", ".bin");
  const child = spawn(
    path.join(bin, "concurrently"),
    [
      "--kill-others",
      "--names",
      "mcp,next",
      "vite build --watch",
      "next dev",
    ],
    {
      cwd: webAppRoot,
      stdio: "inherit",
      env: {
        ...process.env,
        PATH: `${bin}${path.delimiter}${process.env.PATH ?? ""}`,
      },
    },
  );

  let shuttingDown = false;
  const shutdown = async (exitCode) => {
    if (shuttingDown) return;
    shuttingDown = true;
    await stopDevelopmentServer(child);
    process.exit(exitCode);
  };

  process.on("SIGINT", () => {
    void shutdown(130);
  });
  process.on("SIGTERM", () => {
    void shutdown(143);
  });

  await new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("close", (code, signal) => {
      if (shuttingDown) {
        resolve();
        return;
      }
      if (code === 0 || signal === "SIGTERM" || signal === "SIGINT") {
        resolve();
        return;
      }
      reject(
        new Error(
          `concurrently exited ${signal ? `from ${signal}` : `with code ${code}`}`,
        ),
      );
    });
  });
}

const isMain =
  Boolean(process.argv[1]) &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  await main();
}
