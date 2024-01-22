import STATUS_CODE from "../constants/statusCode.js";
import FairyTale from "../models/FairyTalesModel.js";
import Books from "../models/bookModel.js";
import Comments from "../models/commentsModel.js";

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comments.find({})
      .populate("bookName")
      .populate("user")
      .populate("fairyBookName");
    res.send(comments);
  } catch (error) {
    next(error);
  }
};

export const getCommentsByBook = async (req, res, next) => {
  try {
    const comments = await Comments.find({ _id: req.params.id })
      .populate("bookName")
      .populate("user")
      .populate("fairyBookName");

    res.send(comments);
  } catch (error) {
    next(error);
  }
};

export const createComment = async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(STATUS_CODE.FORBIDDEN);
      throw new Error("User is not authorized");
    }

    const { comment, bookName, fairyBookName } = req.body;
    const createComment = await Comments.create({
      comment,
      bookName,
      fairyBookName,
      user: req.user._id,
    });

    const findBook = await Books.findById(bookName);
    if (findBook) {
      const book = await Books.findByIdAndUpdate(
        bookName,
        { $push: { comments: createComment._id } },
        { new: true }
      ).populate({
        path: "comments",
        populate: { path: "user" },
      });
      res.send(book);
    }

    const findFairyBook = await FairyTale.findById(fairyBookName);

    if (findFairyBook) {
      const fairyBook = await FairyTale.findByIdAndUpdate(
        fairyBookName,
        { $push: { comments: createComment._id } },
        { new: true }
      ).populate({
        path: "comments",
        populate: { path: "user" },
      });
      res.send(fairyBook);
    }

    if (!findFairyBook && !findBook) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("This Book doesn't exist");
    }
  } catch (error) {
    next(error);
  }
};

export const removeComment = async (req, res, next) => {
  try {
    const comment = await Comments.findById(req.params.id);
    if (!comment) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Comment not found");
    }

    const book = await Books.findById(comment.bookName);
    if (book) {
      if (book.comments && book.comments.length > 0) {
        await Books.findByIdAndUpdate(comment.bookName, {
          $pull: { comments: comment._id },
        });
      }
      await comment.deleteOne({ _id: comment._id });
      res.send(book);
    }

    const fairyBook = await FairyTale.findById(comment.fairyBookName);
    if (fairyBook) {
      if (fairyBook.comments && fairyBook.comments.length > 0) {
        await FairyTale.findByIdAndUpdate(comment.fairyBookName, {
          $pull: { comments: comment._id },
        });
      }

      await comment.deleteOne({ _id: comment._id });
      res.send(fairyBook);
    }

    if (!fairyBook && !book) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("This Book doesn't have this comment");
    }
  } catch (error) {
    next(error);
  }
};
