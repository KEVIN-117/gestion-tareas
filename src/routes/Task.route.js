import { Router } from "express";
import {
  deleteTask,
  createTask,
  updateTask,
  getTasks,
  getTaskById,
} from "../controller/Task.controller.js";

const router = Router();

router.post("/task", createTask);

router.get("/task", getTasks);

router.get("/task/:id", getTaskById);

router.put("/task/:id", updateTask);

router.delete("/task/:id", deleteTask);

export default router;
