import { sendEmail } from "../middlewares/sendMail.js";
import { User } from "../models/model.js";

const cache = {};
// sending otp to user via email
export const sendOtp = async (req, res) => {
  try {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const { email, name } = req.body;
    cache[email] = otp;
    await sendEmail({ email, name, otp });

    return res.status(200).json({
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { name, email, otp } = req.body;
    console.log(otp, cache[email]);
    const isOtpValid = cache[email] == otp;

    if (!isOtpValid) {
      delete cache[email];
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    let user = await User.findOne({ name, email });

    if (user) {
      const token = await user.generateToken();
      return res
        .cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
        })
        .status(200)
        .json({
          user,
        });
    }

    user = await User.create({ name, email });
    const token = await user.generateToken();

    return res
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000),
      })
      .status(201)
      .json({
        user,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};

export const addFavorite = async (req, res) => {
  try {
    const { meal } = req.body;
    if (!meal) {
      return res.status(400).json({
        message: "Please provide a meal",
      });
    }
    const user = req.user;
    user.favorites.push(meal);
    await user.save();
    return res.status(200).json({
      message: "Meal added to favorites",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
export const getUser = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
export const logout = async (req, res) => {
  try {
    const userEmail = req.user.email;
    delete cache[userEmail];
    return res
      .cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
      })
      .json({
        message: "Logged out successfully",
      });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
