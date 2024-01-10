import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  login,
} from "../controllers/usersController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// api/v1/users

router.get("/", getUsers);
router.post("/create", createUser);
router.post("/login", login);
router.delete("/delete/:id", protect, deleteUser);

export default router;
