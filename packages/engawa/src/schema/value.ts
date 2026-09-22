import { z } from "zod";

export type Value =
  | null
  | string
  | number
  | boolean
  | Value[]
  | { [key: string]: Value };

export const value: z.ZodType<Value> = z.lazy(() =>
  z.union([
    z.null(),
    z.string(),
    z.number().finite(),
    z.boolean(),
    z.array(value),
    z.record(value),
  ]),
);
