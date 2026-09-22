import { fileURLToPath } from "node:url";

type NextConfig = {
  turbopack?: {
    rules?: Record<string, unknown>;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export function withEngawa<Config extends NextConfig>(config: Config): Config {
  const existing = config.turbopack?.rules?.["*"];
  const rules = existing
    ? Array.isArray(existing)
      ? existing
      : [existing]
    : [];

  return {
    ...config,
    turbopack: {
      ...config.turbopack,
      rules: {
        ...config.turbopack?.rules,
        "*": [
          ...rules,
          {
            condition: { query: "?meta" },
            loaders: [
              fileURLToPath(new URL("./metadata-loader.cjs", import.meta.url)),
            ],
            as: "*.js",
          },
        ],
      },
    },
  } as Config;
}
