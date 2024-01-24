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

router.get("/", getFairyBooks);
router.get("/title/:name", getFairyBookByName);
router.get("/title", getFairyBookByName);
router.post("/", addFairyBooks);
router.put("/:id", updateFairyBook);
router.put("/addBook/:bookId", protect, addBookToLibrary); // protect
router.put("/removeBook/:bookId", protect, removeBookFromLibrary); //protect
// router.put("/update/book", updateAllFairyBooks); // //updates all books [ to add a new field]

router.delete("/:id", protect, removeFairyBook);

export default router;
