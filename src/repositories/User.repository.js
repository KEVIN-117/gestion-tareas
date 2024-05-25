import { dbPool } from "../db/connector.js";
import bcrypt from "bcrypt";
export async function createUser(user) {
  try {
    const { name, email, password } = user;

    const salt = await bcrypt.hash(password, 10);
    const client = await dbPool.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *`,
      [name, email, salt],
    );
    return client.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function getUser(data) {
  try {
    const client = await dbPool.query(`SELECT * FROM users WHERE email = $1`, [
      data.email,
    ]);
    return client.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function logIn(data) {
  try {
  } catch (error) {
    throw error;
  }
}
