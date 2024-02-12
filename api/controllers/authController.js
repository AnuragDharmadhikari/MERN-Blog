import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import { errorhandler } from "../utils/error.js";

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
      next(errorhandler(400, "All fields are required"));
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
    next(error);
  }
};
