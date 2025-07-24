import type { Config } from "drizzle-kit";
export default {
  schema: "./src/features/*/schema.ts",
  out: "./src/db/drizzle",
  dialect: "sqlite",
  driver: "expo",
} satisfies Config;
