import { Router } from "express";
import {
  deleteTask,
  createTask,
  updateTask,
  getTasks,
  getTaskById,
} from "../controller/Task.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/task", isAuth, createTask);

router.get("/task", isAuth, getTasks);

router.get("/task/:id", getTaskById);

router.put("/task/:id", updateTask);

router.delete("/task/:id", deleteTask);

export default router;
