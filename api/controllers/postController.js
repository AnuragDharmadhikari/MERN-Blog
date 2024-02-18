import Post from "../models/postModel.js";
import { errorhandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if ((!req.user.isAdmin)) {
    return next(errorhandler(403, "You are not allowed to create a post"));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorhandler(400, "Please provide all the required fields"));
  }

  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

  try {
    const newPost = await Post.create({
      ...req.body,
      slug,
      userId: req.user.id,
    });

    res.status(201).json({ newPost });
  } catch (error) {
    next(error);
  }
};
