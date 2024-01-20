import express from "express";
import {
  addBookToLibrary,
  addFairyBooks,
  getFairyBooks,
  removeBookFromLibrary,
  removeFairyBook,
  // updateAllFairyBooks,
  updateFairyBook,
} from "../controllers/FairyTalesController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express();

router.get("/", getFairyBooks);
router.post("/", addFairyBooks);
router.put("/:id", updateFairyBook);
router.put("/addBook/:bookId", protect, addBookToLibrary); // protect
router.put("/removeBook/:bookId", protect, removeBookFromLibrary); //protect
// router.put("/update/author", updateAllFairyBooks); // //updates all books to have an author - one time use

router.delete("/:id", removeFairyBook);

export default router;
