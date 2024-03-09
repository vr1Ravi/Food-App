import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDataBase } from "./config/database.js";
import { router } from "./routes/routes.js";
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "https://recipe-app-eight-cyan.vercel.app",
      "http://localhost:5173",
      "https://recipe-app-vr1ravi.vercel.app",
    ],
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

// dotenv to load environment variables
if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "config/config.env" });
}

// Connect Database
connectDataBase().catch((err) => {
  console.log(err);
});

app.get("/", (req, res) => res.send("Hello"));

app.use("/api/v1", router);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port  ${process.env.PORT}`);
});
