import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

/**
 * The window switches conversation by pointing a frame at a different view of
 * this document, so a visit fetches it more than once. It is a ~600 kB build
 * artifact, hence the validator: the browser revalidates on every switch and
 * gets a 304 until the build changes, which also keeps a local rebuild visible
 * without a forced reload.
 */
export async function GET(request: Request): Promise<Response> {
  const file = path.join(process.cwd(), "mcp", "dist", "demo.html");
  const { size, mtimeMs } = await fs.stat(file);
  const headers = {
    "content-type": "text/html; charset=utf-8",
    "cache-control": "no-cache",
    etag: `"${size.toString(36)}-${mtimeMs.toString(36)}"`,
  };

  if (request.headers.get("if-none-match") === headers.etag) {
    return new Response(null, { status: 304, headers });
  }

  return new Response(await fs.readFile(file, "utf8"), { headers });
}
