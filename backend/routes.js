import express from "express";
import { login } from "./controller.js";
import { addFavorite } from "./controller.js";
import { isAuth } from "./config/isAuth.js";
const router = express.Router();

router.route("/login").post(login);
router.route("/addfavorite").post(isAuth, addFavorite);
export { router };
