import express from "express";
import {
  createComment,
  getComments,
  getCommentsByBook,
  removeComment,
} from "../controllers/commentsController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getComments);
router.get("/:id", getCommentsByBook);
router.post("/create", protect, createComment);
router.delete("/remove/:id", protect, removeComment);

export default router;
