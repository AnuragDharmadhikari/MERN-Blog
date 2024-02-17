import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorhandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (
      !username ||
      !email ||
      !password ||
      username === "" ||
      email === "" ||
      password === ""
    ) {
      return next(errorhandler(400, "All fields are required"));
    }

    const user = await User.findOne({ email });
    if (user) {
      return next(errorhandler(400, "User already exists"));
    }

    const hashedPasssword = bcryptjs.hashSync(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPasssword,
    });

    res.status(200).json({
      success: true,
      message: "Signup successfully",
      newUser,
    });
  } catch (error) {
    return next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    return next(errorhandler(400, "All fields are required"));
  }
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorhandler(404, "User not found"));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorhandler(400, "Invalid email or password"));
    }

    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      process.env.JWT_SECRET
    );
    //Taking out the password before sending the user details
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access_token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    return next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  const { email, name, googlPhotourl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      const { password: pass, ...rest } = user._doc;

      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = await User.create({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlPhotourl,
      });
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      );
      //Taking out the password before sending the user details
      const { password: pass, ...rest } = validUser._doc;

      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};
