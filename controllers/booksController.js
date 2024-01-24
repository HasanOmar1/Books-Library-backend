import STATUS_CODE from "../constants/statusCode.js";
import Books from "../models/bookModel.js";
import User from "../models/usersModel.js";

export const getBooks = async (req, res, next) => {
  try {
    const books = await Books.find({}).populate({
      path: "comments",
      populate: { path: "user" },
    });

    res.send(books);
  } catch (error) {
    next(error);
  }
};

export const addBook = async (req, res, next) => {
  try {
    const book = await Books.create(req.body);
    res.send(book);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (req, res, next) => {
  try {
    const book = await Books.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Book not found");
    }
    res.send(book);
  } catch (error) {
    next(error);
  }
};

export const addBookToLibrary = async (req, res, next) => {
  try {
    if (req.user === null) {
      res.status(STATUS_CODE.FORBIDDEN);
      throw new Error("User with this token is not found");
    }
    const { bookId } = req.params;
    const book = await Books.findById(bookId);
    if (!book) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Book not found");
    }

    if (req.user.books.includes(bookId)) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error("Book is already in your library");
    }

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { books: book } },
      { new: true }
    )
      .populate("books")
      .populate("fairyBooks");

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
    const book = await Books.findById(bookId);
    if (!book) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Book not found");
    }
    if (req.user.books.includes(bookId)) {
      const user = await User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { books: bookId },
        },
        { new: true }
      )
        .populate("books")
        .populate("fairyBooks");

      await user.save();
      res.send(user);
    } else {
      throw new Error("User doesn't have this book in his library");
    }
  } catch (error) {
    next(error);
  }
};

export const findBookByName = async (req, res, next) => {
  try {
    if (!req.params.name) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Book not found");
    }
    const regex = new RegExp(req.params.name, "i");
    const book = await Books.find({
      "volumeInfo.title": regex,
    }).populate({
      path: "comments",
      populate: { path: "user" },
    });

    if (book.length === 0) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Book not found");
    }
    res.send(book);
  } catch (error) {
    next(error);
  }
};

export const getBooksByCategory = async (req, res, next) => {
  try {
    const categoryKeyword = new RegExp(req.params.category, "i");

    const books = await Books.find({
      "volumeInfo.categories": categoryKeyword,
    });

    if (books.length === 0) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Book not found");
    }

    res.send(books);
  } catch (error) {
    next(error);
  }
};

export const findBookByAuthor = async (req, res, next) => {
  try {
    const regex = new RegExp(req.params.author, "i");
    const book = await Books.find({
      "volumeInfo.authors": regex,
    });
    if (book.length === 0) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Book not found");
    }
    res.send(book);
  } catch (error) {
    next(error);
  }
};
