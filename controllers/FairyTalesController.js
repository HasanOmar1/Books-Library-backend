import STATUS_CODE from "../constants/statusCode.js";
import FairyTale from "../models/FairyTalesModel.js";
import User from "../models/usersModel.js";

export const getFairyBooks = async (req, res, next) => {
  try {
    const book = await FairyTale.find({}).populate({
      path: "comments",
      populate: { path: "user" },
    });
    res.send(book);
  } catch (error) {
    next(error);
  }
};

export const getFairyBookByName = async (req, res, next) => {
  try {
    if (!req.params.name) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Book not found");
    }
    const regex = new RegExp(req.params.name, "i");
    const book = await FairyTale.find({ title: regex }).populate({
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

export const addFairyBooks = async (req, res, next) => {
  try {
    const { title, author, description, content, img, categories } = req.body;

    const splitString = (str, chunkSize) => {
      const regex = new RegExp(`.{1,${chunkSize}}`, "g");
      const matchedSubstrings = str.match(regex) || [];

      // Add a space at the end of each substring
      const substringsWithSpace = matchedSubstrings.map(
        (substring) => substring + " "
      );

      return substringsWithSpace;
    };

    // Split each string in the content array into new strings with a maximum length of 100 characters
    const newContentArray = content.reduce((acc, str) => {
      const stringsArray = splitString(str, 100);
      return acc.concat(stringsArray);
    }, []);

    const book = await FairyTale.create({
      title,
      author,
      description,
      content: newContentArray,
      img,
      categories,
    });

    res.send(book);
  } catch (error) {
    next(error);
  }
};

export const removeFairyBook = async (req, res, next) => {
  try {
    const book = await FairyTale.findById(req.params.id);
    if (!book) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Book not found");
    }

    let user = await User.findById(req.user._id);

    if (user.fairyBooks.includes(book._id)) {
      user = await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { fairyBooks: book._id } },
        { new: true }
      )
        .populate("books")
        .populate("fairyBooks");
      await book.deleteOne({ _id: book._id });
      res.send(user);
    } else {
      const deletedBook = await FairyTale.findByIdAndDelete(req.params.id);
      if (!deletedBook) {
        res.status(STATUS_CODE.NOT_FOUND);
        throw new Error("Book not found");
      }
      res.send(deletedBook);
    }
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

//updates all books to have new field
// export const updateAllFairyBooks = async (req, res, next) => {
//   try {
//     const books = await FairyTale.updateMany(
//       {},
//       { $set: { categories: "Fairy Tale" } },
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
