import dotenv from "dotenv";
import { resolve } from "path";
import { fileURLToPath } from "url";

// Load environment variables before importing env.ts
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, "..", "..", "..");
dotenv.config({ path: resolve(__dirname, ".env.local") });

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "@/env.ts";
import * as schema from "./schema.ts";

const pool = new Pool({
	connectionString: env.DATABASE_URL,
});
export const db = drizzle(pool, { schema });
