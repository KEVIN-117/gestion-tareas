import { dbPool } from "../src/db/connector.js";
import { tasks, users } from "./placeholder.js";

async function seedUsers(client) {
  try {
    client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    const query = `CREATE TABLE IF NOT EXISTS users (
        ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        NAME VARCHAR(255) NOT NULL,
        EMAIL VARCHAR(255) UNIQUE NOT NULL,
        PASSWORD VARCHAR(255) NOT NULL,
        CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;

    const createdTable = await client.query(query);
    console.log("Table created successfully", createdTable);
    const insertData = Promise.all(
      users.map(async (user) => {
        return await client.query(
          `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
          [user.name, user.email, user.password],
        );
      }),
    );

    console.log(`Seeded ${insertData.length} clients`);
    return {
      createdTable,
      insertData,
    };
  } catch (e) {
    console.log(e);
  }
}

async function seedTasks(client) {
  try {
  } catch (e) {
    console.log(e);
  }
}
