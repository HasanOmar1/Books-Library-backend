import express from "express";
import {
  addBookToLibrary,
  addFairyBooks,
  getFairyBookByName,
  getFairyBooks,
  removeBookFromLibrary,
  removeFairyBook,
  // updateAllFairyBooks,
  updateFairyBook,
} from "../controllers/FairyTalesController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express();

// api/v1/fairy

router.get("/", getFairyBooks); // gets all fairytales and books added by users
router.get("/title/:name", getFairyBookByName); // gets book by name
router.get("/title", getFairyBookByName); // check if search length === 0

router.post("/", addFairyBooks); // creates a book [for the user to add a book to the site]

router.put("/:id", updateFairyBook); // updates a book
router.put("/addBook/:bookId", protect, addBookToLibrary); // adds book to user library
router.put("/removeBook/:bookId", protect, removeBookFromLibrary); // removes book from user library
// router.put("/update/book", updateAllFairyBooks); // updates all books [ to add a new field]

router.delete("/:id", protect, removeFairyBook); // deletes a book

export default router;
