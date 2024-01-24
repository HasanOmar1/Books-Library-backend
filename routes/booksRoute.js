import express from "express";
import {
  addBook,
  addBookToLibrary,
  removeBookFromLibrary,
  getBooks,
  deleteBook,
  findBookByName,
  getBooksByCategory,
  findBookByAuthor,
} from "../controllers/booksController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// api/v1/books

router.get("/", getBooks); // gets all books
router.get("/search/:name", findBookByName); // gets books by name
router.get("/search", findBookByName); // checks if search length === 0
router.get("/category/:category", getBooksByCategory); // gets books by category
router.get("/author/:author", findBookByAuthor); // gets books by author

router.post("/", addBook); // creates a book
router.put("/addBook/:bookId", protect, addBookToLibrary); // Adds book to user library
router.put("/removeBook/:bookId", protect, removeBookFromLibrary); // Removes book from user library
router.delete("/:id", deleteBook); // Removes Book from the database

export default router;
