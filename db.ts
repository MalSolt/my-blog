import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const connectionString = process.env.AUTH_DRIZZLE_URL!;

export const connection = postgres(connectionString, { max: 1 });
export const db = drizzle(connection);
