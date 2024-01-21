import express from "express";
import {
  createComment,
  getComments,
  removeComment,
} from "../controllers/commentsController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getComments);
router.post("/create", protect, createComment);
router.delete("/remove/:id", removeComment);

export default router;
