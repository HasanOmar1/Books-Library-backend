import express from "express";
import {
  addFairyBooks,
  getFairyBooks,
  removeFairyBook,
  updateFairyBook,
} from "../controllers/FairyTalesController.js";

const router = express();

router.get("/", getFairyBooks);
router.post("/", addFairyBooks);
router.put("/:id", updateFairyBook);
router.delete("/:id", removeFairyBook);

export default router;
