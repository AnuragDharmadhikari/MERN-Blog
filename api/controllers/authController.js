import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";

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
      return res.status(400).json({
        message: "All fields are required",
      });
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
    return res.status(500).json({ message: error.message });
  }
};
