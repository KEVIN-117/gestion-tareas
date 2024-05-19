import { UserService } from "../services/User.service.js";
import { createAccessToken } from "../utils/jwt.js";

const userService = new UserService();
export function login(req, res, next) {
  try {
    // Login process
    res.status(200).json({
      message: "Login success",
    });
  } catch (error) {
    next(error);
  }
}

export function logout(req, res, next) {
  try {
    // Logout process
    res.status(200).json({
      message: "Logout success",
    });
  } catch (error) {
    next(error);
  }
}

export async function register(req, res, next) {
  try {
    const data = req.body;
    const user = await userService.register(data);
    const token = await createAccessToken({ id: user.id });

    res.cookie("token", token, {
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours or 1 day
    });

    return res.status(201).json({
      message: "Register success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export function profile(req, res, next) {
  try {
    const { id } = req.params;
  } catch (error) {
    next(error);
  }
}
