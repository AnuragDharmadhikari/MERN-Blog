import Comment from "../models/commentModel.js";
import { errorhandler } from "../utils/error.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(errorhandler, "You are not allowed to create the comment");
    }

    const newComment = await Comment.create({
      content,
      postId,
      userId,
    });

    res.status(200).json(newComment);
  } catch (error) {
    next(error);
  }
};

