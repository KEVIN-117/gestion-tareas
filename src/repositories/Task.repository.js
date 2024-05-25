import { dbPool } from "../db/connector.js";

export async function createTask(task) {
  try {
    const { title, description, user_id } = task;
    const client = await dbPool.query(
      `INSERT INTO tasks (title, description, user_id) VALUES ($1, $2, $3) RETURNING *`,
      [title, description, user_id],
    );
    return client.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function getTasks(id) {
  try {
    const client = await dbPool.query(`SELECT * FROM tasks WHERE user_id = $1`, [id]);
    return client.rows;
  } catch (error) {
    throw error;
  }
}

export async function getTaskById(id) {
  try {
    const client = await dbPool.query(`SELECT * FROM tasks WHERE id = $1`, [
      id,
    ]);
    return client.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function updateTask(id, task) {
  try {
    const { title, description, status } = task;
    const client = await dbPool.query(
      `UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *`,
      [title, description, status, id],
    );
    return client.rows[0];
  } catch (error) {
    throw error;
  }
}

export async function deleteTask(id) {
  try {
    const client = await dbPool.query(`DELETE FROM tasks WHERE id = $1`, [id]);
    return client.rows[0];
  } catch (error) {
    throw error;
  }
}
