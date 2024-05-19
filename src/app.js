import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error.middleware.js";

import UsersRoute from "./routes/Users.route.js";
import TaskRoute from "./routes/Task.route.js";
const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", UsersRoute);
app.use("/api", TaskRoute);

app.use(errorHandler);
export default app;
