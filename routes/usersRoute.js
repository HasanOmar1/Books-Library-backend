import express from "express";
import {
  createUser,
  deleteUser,
  getUsers,
  login,
  getLoggedUser,
} from "../controllers/usersController.js";

const router = express.Router();

// api/v1/users

router.get("/", getUsers); // gets all users
router.get("/currentUser", getLoggedUser); // gets logged on user [ not using it ]
router.post("/create", createUser); // creates an account
router.post("/login", login); // login to your account
router.delete("/delete/:id", deleteUser); // deletes user from the database

export default router;
