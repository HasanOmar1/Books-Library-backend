import STATUS_CODE from "../constants/statusCode.js";
import FairyTale from "../models/FairyTalesModel.js";
import User from "../models/usersModel.js";

export const getFairyBooks = async (req, res, next) => {
  try {
    const book = await FairyTale.find({});
    res.send(book);
  } catch (error) {
    next(error);
  }
};

export const getFairyBookByName = async (req, res, next) => {
  try {
    const regex = new RegExp(req.params.name, "i");
    const book = await FairyTale.find({ title: regex });
    if (!book) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Book not found");
    }
    res.send(book);
  } catch (error) {
    next(error);
  }
};

export const addFairyBooks = async (req, res, next) => {
  try {
    const { title, content, img } = req.body;
    if (!title || !content || !img) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Please fill all fields");
    }
    const book = await FairyTale.create({
      title,
      content,
      img,
    });
    res.send(book);
  } catch (error) {
    next(error);
  }
};

export const removeFairyBook = async (req, res, next) => {
  try {
    const book = await FairyTale.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Book not found");
    }
    res.send(book);
  } catch (error) {
    next(error);
  }
};

export const updateFairyBook = async (req, res, next) => {
  try {
    const book = await FairyTale.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Book not found");
    }
    res.send(book);
  } catch (error) {
    next(error);
  }
};

//updates all books to have an author - one time use
// export const updateAllFairyBooks = async (req, res, next) => {
//   try {
//     const books = await FairyTale.updateMany(
//       {},
//       { $set: { author: "Edith Howes" } },
//       { multi: true }
//     );
//     res.send(books);
//   } catch (error) {
//     next(error);
//   }
// };

export const addBookToLibrary = async (req, res, next) => {
  try {
    if (req.user === null) {
      res.status(STATUS_CODE.FORBIDDEN);
      throw new Error("User with this token is not found");
    }
    const { bookId } = req.params;
    const book = await FairyTale.findById(bookId);
    if (!book) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Book not found");
    }

    if (req.user.fairyBooks.includes(bookId)) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error("Book is already in your library");
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { fairyBooks: book } },
      { new: true }
    )
      .populate("fairyBooks")
      .populate("books");

    if (!user) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("User not found");
    }

    await user.save();
    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const removeBookFromLibrary = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const book = await FairyTale.findById(bookId);
    if (!book) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Book not found");
    }
    if (req.user.fairyBooks.includes(bookId)) {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { fairyBooks: bookId },
        },
        { new: true }
      )
        .populate("fairyBooks")
        .populate("books");

      await user.save();
      res.send(user);
    } else {
      throw new Error("User doesn't have this book in his library");
    }
  } catch (error) {
    next(error);
  }
};
