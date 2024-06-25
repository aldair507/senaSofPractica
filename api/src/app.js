import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import { PORT } from "../config/config.js";
import cors from 'cors'

import adminRouter from "./routes/admin.routes.js";
import rolesRouter from './routes/roles.routes.js'

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api", adminRouter);
app.use('/api',rolesRouter)

app.listen(PORT, () => {
  console.log("server on port", PORT);
});
