import express from "express";
import {
  addFairyBooks,
  getFairyBooks,
  removeFairyBook,
  // updateAllFairyBooks,
  updateFairyBook,
} from "../controllers/FairyTalesController.js";

const router = express();

router.get("/", getFairyBooks);
router.post("/", addFairyBooks);
router.put("/:id", updateFairyBook);
// router.put("/update/author", updateAllFairyBooks); // //updates all books to have an author - one time use

router.delete("/:id", removeFairyBook);

export default router;
