import express from "express";
import {
  addBook,
  addBookToLibrary,
  removeBookFromLibrary,
  getBooks,
  deleteBook,
  findBookByName,
  getBooksByCategory,
} from "../controllers/booksController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// /api/v1/books

router.get("/", getBooks);
router.get("/search/name", findBookByName);
router.get("/search/category", getBooksByCategory);
router.post("/", addBook);
router.put("/addBook/:bookId", protect, addBookToLibrary); // protect
router.put("/removeBook/:bookId", protect, removeBookFromLibrary); //protect
router.delete("/:id", deleteBook);
export default router;
