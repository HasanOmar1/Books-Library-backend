import STATUS_CODE from "../constants/statusCode.js";
import Books from "../models/bookModel.js";

export const getBooks = async (req, res, next) => {
  try {
    const books = await Books.find({});
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

// export const addBook = async (req,res,next) => {
//     try {

//     } catch (error) {
//         next(error)
//     }
// }

// export const addBook = async (req,res,next) => {
//     try {

//     } catch (error) {
//         next(error)
//     }
// }
