# Better Response

Better Response is a small, free agent plugin that improves the agent's reply when plain text is hard to use. Its UI engine is Engawa: the agent authors a validated tree, and Engawa renders it as an MCP App without another LLM call.

[Website](https://betterresponse.vercel.app) · [Privacy](https://betterresponse.vercel.app/privacy) · [Terms](https://betterresponse.vercel.app/terms) · [Issues](https://github.com/dzhunka/better-response/issues)

Questions and bug reports go to the issue tracker; support is best-effort on a noncommercial project. MIT licensed.

## Repository standard

This repository is a pnpm monorepo:

```text
apps/better-response/          Website, Streamable HTTP MCP server, and MCP App renderer
packages/engawa/       Engawa schema, renderer, components, and styles
plugins/better-response/dist/  Installable skill, host metadata, logo, and MCP URL
```

`apps/` contains deployable services, `packages/` contains framework packages, and `plugins/<name>/dist` contains the files installed into an agent host. Better Response has one small plugin distribution shared by Cursor and Codex. It points both hosts to the Visualize MCP server owned entirely by `apps/better-response`; no server or renderer is installed locally.

The remaining dotfolders are host entrypoints, not competing layouts:

```text
.agents/plugins/marketplace.json   Codex repository marketplace
.cursor-plugin/marketplace.json    Cursor repository marketplace
.cursor/mcp.json                   Cursor CLI localhost HTTP configuration
plugins/better-response/dist/.codex-plugin/     Required Codex manifest
plugins/better-response/dist/.cursor-plugin/    Required Cursor manifest
```

The two plugin manifests and two marketplace catalogs cannot be merged because the hosts require different paths and schemas. Both installable manifests connect to the production Streamable HTTP endpoint. The isolated development launcher overrides only that URL to localhost, so local and production consumers use the same MCP server and transport.

The MCP App source lives under `apps/better-response/mcp`. Its Vite build produces the ignored `apps/better-response/mcp/dist/app.html` immediately before Next.js builds. The MCP route serves that generated resource, and Next.js includes it in the deployment output. It is never a committed or manually synchronized plugin artifact.

## Verify

```bash
pnpm install
pnpm probe
```

The probe builds the MCP App and Next.js project, starts the production build locally, and runs the full vertical over its Streamable HTTP route.

## Develop through Codex

```bash
pnpm dev
```

`pnpm dev:codex` is the same command. This is the complete local development loop. It builds the hosted MCP App, starts it in Vite watch mode, starts the watched Next.js website and MCP route at `http://127.0.0.1:3100`, and launches a fresh Codex desktop instance connected to `http://127.0.0.1:3100/api/mcp`.

The launcher creates disposable Codex and Electron data directories under a short `/tmp/br-*` path, copies only the current Codex login, marks the disposable profile's onboarding and Codex-to-ChatGPT migration announcement as complete, installs `better-response@better-response-local` from this repository as the only local plugin, seeds two projectless threads—**Create beef steak shopping list** and **Find Cube Attain 2026 changes** (cut before the first markdown comparison table)—and opens one additional Codex instance. It does not load prior personal tasks, personal configuration, or previously installed personal plugins. Codex still provides its own bundled first-party plugins. Close the isolated instance to stop the local server and remove its temporary state.

Keep that instance open while developing. Next.js reloads the MCP route, Vite rebuilds the MCP App, and skill edits are copied into the disposable plugin cache. Start a new Codex task after changing the skill or tool contract so that the task receives the new context.

Open either seeded thread and invoke `/visualize` (or `$` → **Visualize**): the shopping-list thread for the checklist path, or the Cube Attain thread for an Engawa DataGrid instead of Markdown. The agent may also use Better Response without a manual invocation whenever the available interface would be materially easier to use than a static response.

The launcher requires the signed Codex CLI and a file-based login at `~/.codex/auth.json`. The separate desktop instance uses the current app build's internal `CODEX_ELECTRON_USER_DATA_PATH` development override together with Chromium's matching `--user-data-dir` switch. Both receive the same canonical path so Electron uses one disposable profile and one instance lock. These internal behaviors should be rechecked after Codex app upgrades.

To update the personal Codex installation explicitly instead:

```bash
pnpm install:codex
```

That command mirrors the plugin into `~/plugins/better-response`, applies the Codex cachebuster, and reinstalls `better-response@personal`. The installed plugin connects to `https://betterresponse.vercel.app/api/mcp`; fully restart the normal Codex instance if it retains the prior plugin configuration.

## Develop through Cursor

```bash
pnpm dev:cursor
```

This launches the Cursor equivalent of the Codex loop: the same watched local MCP route, plus a separate Cursor desktop instance connected to `http://127.0.0.1:3100/api/mcp`.

The launcher keeps a persistent isolated Electron profile under `~/.better-response/cursor-dev` (`--user-data-dir` and `--extensions-dir`) so the test instance can run beside everyday Cursor without loading everyday chats or settings. It does not override `HOME`, because that breaks Cursor's Keychain access. Cursor still loads local plugins from `~/.cursor/plugins/local`, so the launcher points that Better Response install at localhost for the session and restores the production plugin files when you close the isolated window. Keep the everyday Cursor window closed during this session if you do not want it to share that localhost plugin. The isolated profile is kept so a one-time sign-in can persist across runs.

Keep that instance open while developing. Next.js reloads the MCP route, Vite rebuilds the MCP App, and skill edits are copied into the isolated plugin install. Start a new agent chat after changing the skill or tool contract so that the chat receives the new context.

Discuss a recipe, invoke `/visualize`, and submit the prompt.

To update the everyday Cursor installation explicitly instead:

```bash
mkdir -p "$HOME/.cursor/plugins/local"
pnpm install:cursor
```

That command mirrors the plugin into `~/.cursor/plugins/local/better-response`. The installed plugin connects to `https://betterresponse.vercel.app/api/mcp`. It skips the sync when Cursor's local plugin directory does not exist. After syncing, use Cursor's plugin reload; fully restart Cursor if it retains the prior plugin configuration. Use a real directory rather than a symlink. Do not keep a marketplace-installed Better Response enabled alongside the local copy.

For server-only or Cursor CLI development, run `pnpm dev:server`; the project-level `.cursor/mcp.json` points to the localhost HTTP route. `pnpm dev`, `pnpm dev:cursor`, and `pnpm dev:server` stop a leftover Next.js worker from a previous session before starting, so killing only the parent Node process no longer blocks the next run.

## Scope

Better Response is a free, noncommercial project in pre-release `0.x`. Breaking contract changes advance the minor version; `1.0.0` is reserved for the public release. The first product slice stops at local interaction inside the rendered view: nothing the user touches there is sent back to the agent.
