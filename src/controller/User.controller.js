import { UserService } from "../services/User.service.js";
import { createAccessToken } from "../utils/jwt.js";
import bcrypt from "bcrypt";
import { dbPool } from "../db/connector.js";

const userService = new UserService();
export async function login(req, res, next) {
  try {
    const data = req.body;
    const response = await dbPool.query(
      `SELECT * FROM users WHERE email = $1`,
      [data.email],
    );
    console.log(response.rows[0]);
    let user = response.rows[0];
    if (user.email !== data.email) {
      return res.status(401).json({
        message: "Email not found",
      });
    }
    const isValid = await bcrypt.compare(data.password, user.password);
    if (!isValid) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }
    user = await userService.login(data);
    const token = await createAccessToken({ id: user.id });

    res.cookie("token", token, {
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours or 1 day
    });
    return res.status(200).json({
      message: "Login success",
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    next(error);
  }
}

export function logout(req, res, next) {
  try {
    res.clearCookie("token");
    return res.status(200).json({
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
    return res.status(200).json({
      message: "Profile",
      data: {
        id: req.id,
      },
    });
  } catch (error) {
    next(error);
  }
}
