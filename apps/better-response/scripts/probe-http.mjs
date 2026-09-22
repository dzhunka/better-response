import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const packageRoot = fileURLToPath(new URL("..", import.meta.url));
const mcpProbe = fileURLToPath(new URL("./probe-mcp.mjs", import.meta.url));
const endpoint = "http://127.0.0.1:3210/api/mcp";
const server = spawn(
  "pnpm",
  ["exec", "next", "start", "--hostname", "127.0.0.1", "--port", "3210"],
  {
    cwd: packageRoot,
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
    stdio: "inherit",
  },
);

try {
  const deadline = Date.now() + 30_000;

  let homeResponse;

  while (Date.now() < deadline) {
    if (server.exitCode !== null) {
      throw new Error(`Next server exited with code ${server.exitCode}.`);
    }

    try {
      homeResponse = await fetch("http://127.0.0.1:3210");

      if (homeResponse.ok) {
        break;
      }
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
      continue;
    }

    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  if (Date.now() >= deadline) {
    throw new Error("Timed out waiting for the Better Response Next server.");
  }

  const home = await homeResponse.text();
  if (!home.includes("Tools for agents. Software for humans.")) {
    throw new Error("Better Response website did not render the expected public page.");
  }

  const forbidden = await fetch(endpoint, {
    headers: { Origin: "https://example.com" },
  });
  if (forbidden.status !== 403) {
    throw new Error("Better Response MCP route accepted an untrusted Origin header.");
  }

  await new Promise((resolve, reject) => {
    const probe = spawn(
      process.execPath,
      [mcpProbe, endpoint],
      { cwd: packageRoot, stdio: "inherit" },
    );

    probe.once("error", reject);
    probe.once("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`HTTP probe exited with code ${code}.`));
      }
    });
  });
} finally {
  server.kill("SIGTERM");
}
