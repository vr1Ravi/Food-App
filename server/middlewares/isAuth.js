import jwt from "jsonwebtoken";
import { User } from "../models/model.js";
export const isAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(400).json({
        message: "Login first",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user_id = decoded._id;
    req.user = await User.findById(user_id);
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
