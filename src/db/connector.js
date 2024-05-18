import pg from "pg";
import { getEnv } from "../../config/env.js";

const { dbHost, dbName, dbPass, dbPort, dbUser } = getEnv();

export const dbPool = new pg.Pool({
  user: dbUser,
  host: dbHost,
  database: dbName,
  password: dbPass,
  port: dbPort,
});
