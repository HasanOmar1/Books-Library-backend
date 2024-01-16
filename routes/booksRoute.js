import express from "express";
import {
  addBook,
  addBookToLibrary,
  removeBookFromLibrary,
  getBooks,
  deleteBook,
  findBookByName,
  // getBooksByCategory,
  getBooksByCategory,
} from "../controllers/booksController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// /api/v1/books

router.get("/", getBooks);
router.get("/search/:name", findBookByName);
// router.get("/search/category", getBooksByCategory); // ?category= [name of category]

// Categories
router.get("/category/:category", getBooksByCategory);

//
router.post("/", addBook);
router.put("/addBook/:bookId", protect, addBookToLibrary); // protect
router.put("/removeBook/:bookId", protect, removeBookFromLibrary); //protect
router.delete("/:id", deleteBook);
export default router;
