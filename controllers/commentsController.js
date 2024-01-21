import STATUS_CODE from "../constants/statusCode.js";
import Books from "../models/bookModel.js";
import Comments from "../models/commentsModel.js";
import User from "../models/usersModel.js";

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comments.find({})
      .populate("bookName")
      .populate("user");
    res.send(comments);
  } catch (error) {
    next(error);
  }
};

// export const createComment = async (req, res, next) => {
//   try {
//     if (!req.user) {
//       res.status(STATUS_CODE.FORBIDDEN);
//       throw new Error("User is not authorized");
//     }

//     const { comment } = req.body;
//     const createComment = await Comments.create({
//       //   by: req.user._id,
//       comment: comment,
//     });

//     res.send(createComment);
//   } catch (error) {
//     next(error);
//   }
// };

export const createComment = async (req, res, next) => {
  try {
    // if (!req.user) {
    //   res.status(STATUS_CODE.FORBIDDEN);
    //   throw new Error("User is not authorized");
    // }

    const { comment, bookName } = req.body;
    const createComment = await Comments.create({
      comment,
      bookName,
      user: req.user._id,
    });

    const book = await Books.findByIdAndUpdate(
      bookName,
      { $push: { comments: createComment._id } },
      { new: true }
    ).populate("comments");
    res.send(book);
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
    if (!book) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("This Book doesn't have this comment");
    }

    if (book.comments) {
      await Books.findByIdAndUpdate(comment.bookName, {
        $pull: { comments: comment._id },
      });
    }

    await comment.deleteOne({ _id: comment._id });
    res.send(`Comment with the id of ${comment._id} has been deleted`);
  } catch (error) {
    next(error);
  }
};

// export const getComments = async (req,res,next) => {
//     try {

//     } catch (error) {
//         next(error)
//     }
// }

// export const addComment = async (req, res, next) => {
//   try {
//     if (!req.user) {
//       res.status(STATUS_CODE.FORBIDDEN);
//       throw new Error("User is not authorized");
//     }

//     const { comment } = req.body;
//     const book = await Books.findByIdAndUpdate(
//       req.params.bookId,
//       {
//         $push: {
//           comments: comment,
//         },
//       },
//       { new: true }
//     ).populate("comments");
//     if (!book) {
//       res.status(STATUS_CODE.NOT_FOUND);
//       throw new Error("Book not found");
//     }
//     res.send(book);
//   } catch (error) {
//     next(error);
//   }
// };
