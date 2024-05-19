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
          `INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING *`,
          [user.id, user.name, user.email, user.password],
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
    client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    const query = `CREATE TABLE IF NOT EXISTS tasks (
        ID UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        TITLE VARCHAR(255) NOT NULL UNIQUE,
        DESCRIPTION TEXT,
        USER_ID UUID NOT NULL,
        STATUS CHAR(1) NOT NULL DEFAULT 'P',
        CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UPDATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (USER_ID) REFERENCES users(ID)
    )`;

    const createdTable = await client.query(query);
    console.log("Table created successfully", createdTable);
    const insertData = Promise.all(
      tasks.map(async (task) => {
        return await client.query(
          `INSERT INTO tasks (id, title, description, user_id, status) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
          [task.id, task.title, task.description, task.user_id, task.status],
        );
      }),
    );

    console.log(`Seeded ${insertData.length} tasks`);
    return {
      createdTable,
      insertData,
    };
  } catch (e) {
    console.log(e);
  }
}

async function seed() {
  try {
    await dbPool.connect(async (err, client) => {
      if (err) {
        return console.error("Error acquiring client", err.stack);
      }
      await seedUsers(client);
      await seedTasks(client);
      console.log("Seed completed");
      client.release();
    });
  } catch (e) {
    console.log(e);
  }
}

console.log("Seeding data...");
seed();
