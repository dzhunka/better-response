import type { NextConfig } from "next";
import { withEngawa } from "@better-response/engawa/next";

const config: NextConfig = withEngawa({
  outputFileTracingIncludes: {
    "/api/mcp": ["mcp/dist/app.html"],
    "/demo": ["mcp/dist/demo.html"],
  },
  transpilePackages: ["@better-response/engawa"],
});

export default config;
