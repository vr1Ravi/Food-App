import express from "express";
import {
  login,
  logout,
  addFavorite,
  sendOtp,
  getUser,
} from "../controllers/controller.js";

import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.route("/sendotp").post(sendOtp);
router.route("/login").post(login);
router.route("/addfavorite").post(isAuth, addFavorite);
router.route("/logout").get(isAuth, logout);
router.route("/me").get(isAuth, getUser);
export { router };
