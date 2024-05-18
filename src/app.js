import express from "express";
import morgan from "morgan";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(errorHandler);
export default app;
