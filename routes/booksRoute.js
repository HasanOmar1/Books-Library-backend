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

router.get("/", getBooks);
router.post("/", addBook);
router.post("/addBook/:bookId", protect, addBookToLibrary);
router.delete("/removeBook/:bookId", protect, removeBookFromLibrary);
router.delete("/:id", deleteBook);
export default router;
