import express from "express";
import {
  addBook,
  addBookToLibrary,
  removeBookFromLibrary,
  getBooks,
  deleteBook,
} from "../controllers/booksController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// /api/v1/books

router.get("/", getBooks);
router.post("/", addBook);
router.put("/addBook/:bookId", protect, addBookToLibrary);
router.put("/removeBook/:bookId", protect, removeBookFromLibrary);
router.delete("/:id", deleteBook);
export default router;
