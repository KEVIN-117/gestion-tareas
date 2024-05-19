import {
  deleteTask,
  createTask,
  getTasks,
  updateTask,
  getTaskById,
} from "../repositories/Task.repository.js";

export class TaskService {
  async create(task) {
    try {
      return await createTask(task);
    } catch (error) {
      throw error;
    }
  }

  async getAll() {
    try {
      return await getTasks();
    } catch (error) {
      throw error;
    }
  }

  async getById(id) {
    try {
      return await getTaskById(id);
    } catch (error) {
      throw error;
    }
  }

  async update(id, task) {
    try {
      return await updateTask(id, task);
    } catch (error) {
      throw error;
    }
  }

  async delete(id) {
    try {
      return await deleteTask(id);
    } catch (error) {
      throw error;
    }
  }
}
