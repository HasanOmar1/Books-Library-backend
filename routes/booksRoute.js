import express from "express";
import {
  addBook,
  addBookToLibrary,
  deleteBook,
  getBooks,
} from "../controllers/booksController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getBooks);
router.post("/", addBook);
router.post("/addBook/:bookId", protect, addBookToLibrary);
router.delete("/:id", deleteBook);
export default router;
