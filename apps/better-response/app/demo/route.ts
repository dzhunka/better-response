import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

export async function GET(): Promise<Response> {
  const html = await fs.readFile(
    path.join(process.cwd(), "mcp", "dist", "demo.html"),
    "utf8",
  );

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
