import { Router } from "express";
import {
  logout,
  register,
  profile,
  login,
} from "../controller/User.controller.js";
import { isAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);

router.get("/profile", isAuth, profile);

export default router;
