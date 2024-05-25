import jwt from "jsonwebtoken";
import { getEnv } from "../../config/env.js";

const { secretToken } = getEnv();
export function isAuth(req, res, next) {
  console.log(req.cookies);
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  jwt.verify(token, secretToken, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    req.id = decoded.id;
    next();
  });
}
