import express from "express";
import {
  createComment,
  getComments,
  getCommentById,
  removeComment,
} from "../controllers/commentsController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// api/v1/comments

router.get("/", getComments); // gets all comments
router.get("/:id", getCommentById); // gets comment by ID
router.post("/create", protect, createComment); // creates a comment
router.delete("/remove/:id", protect, removeComment); // removes a comment

export default router;
