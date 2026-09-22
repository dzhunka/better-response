import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import fs from "node:fs/promises";
import path from "node:path";

import { createBetterResponseServer } from "../../../mcp/server";

export const runtime = "nodejs";

async function handle(request: Request): Promise<Response> {
  const origin = request.headers.get("origin");

  if (origin && origin !== new URL(request.url).origin) {
    return new Response("Forbidden", { status: 403 });
  }

  const server = createBetterResponseServer(() =>
    fs.readFile(path.join(process.cwd(), "mcp", "dist", "app.html"), "utf8"),
  );
  const transport = new WebStandardStreamableHTTPServerTransport({
    enableJsonResponse: true,
    sessionIdGenerator: undefined,
  });

  await server.connect(transport);

  try {
    return await transport.handleRequest(request);
  } finally {
    await server.close();
  }
}

export { handle as DELETE, handle as GET, handle as POST };
