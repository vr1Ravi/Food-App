import { User } from "./model.js";
export const login = async (req, res) => {
  try {
    const { name, code } = req.body;
    let user = await User.findOne({ name, code });
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

    user = await User.create({ name, code });
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
