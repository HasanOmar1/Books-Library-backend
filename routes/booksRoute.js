import express from "express";
import {
  addBook,
  addBookToLibrary,
  removeBookFromLibrary,
  getBooks,
  deleteBook,
  findBookByName,
  getBooksByCategory,
  getBooksWithNoDescription,
} from "../controllers/booksController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// /api/v1/books

router.get("/", getBooks);
router.get("/description/no", getBooksWithNoDescription);
router.get("/search/:name", findBookByName); // gets books by name
router.get("/category/:category", getBooksByCategory); // gets books by category

router.post("/", addBook);
router.put("/addBook/:bookId", protect, addBookToLibrary); // protect
router.put("/removeBook/:bookId", protect, removeBookFromLibrary); //protect
router.delete("/:id", deleteBook);

export default router;
