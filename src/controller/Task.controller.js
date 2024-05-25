import { TaskService } from "../services/Task.service.js";

const taskService = new TaskService();

export async function createTask(req, res, next) {
  try {
    console.log(req.id);
    const task = req.body;
    const data = {
      ...task,
      user_id: req.id,
    };
    const newTask = await taskService.create(data);
    return res.status(201).json(newTask);
  } catch (error) {
    if (error.code === "23502") {
      return res.status(400).json({
        message:
          "Please provide all required fields title, description, user_id",
      });
    } else if (error.code === "23505") {
      return res.status(400).json({ message: "Task already exists" });
    }
    return next(error);
  }
}

export async function getTasks(req, res) {
  try {
    const id = req.id;
    const tasks = await taskService.getAll(id);
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error);
  }
}

export async function getTaskById(req, res, next) {
  try {
    const { id } = req.params;
    const task = await taskService.getById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json(task);
  } catch (error) {
    if (error.code === "22P02") {
      return res.status(404).json({ message: "Task not found" });
    }
    return next(error);
  }
}

export async function updateTask(req, res) {
  try {
    const id = req.params.id;
    const task = req.body;
    const updatedTask = await taskService.update(id, task);
    res.status(200).json(updatedTask);
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTask(req, res) {
  try {
    const id = req.params.id;
    await taskService.delete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
  }
}
