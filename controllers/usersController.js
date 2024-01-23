import STATUS_CODE from "../constants/statusCode.js";
import User from "../models/usersModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// generates token
const generateToken = (id, email) => {
  return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

//  Create new user
//  POST /api/v1/users/create
//  Public
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Please fill all fields");
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const capName = name.charAt(0).toUpperCase() + name.slice(1);
    const nameExist = await User.findOne({ name: capName });
    if (nameExist) {
      res.status(STATUS_CODE.CONFLICT);
      throw new Error("Name already taken");
    }

    const user = await User.create({
      name: capName,
      email,
      password: hashedPassword,
    });

    if (user) {
      res.status(STATUS_CODE.CREATED);
      res.send({
        message: "User has been created",
        data: user,
        ok: true,
        token: generateToken(user._id, user.email),
      });
    }
  } catch (error) {
    next(error);
  }
};

//  Login to account
//  POST /api/v1/users/login
//  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(STATUS_CODE.BAD_REQUEST);
      throw new Error("Please provide your email and password");
    }

    const user = await User.findOne({ email })
      .populate("books")
      .populate("fairyBooks");
    if (user && (await bcrypt.compare(password, user.password))) {
      res.send({
        _id: user.id,
        name: user.name,
        email: user.email,
        books: user.books,
        fairyBooks: user.fairyBooks,
        token: generateToken(user._id, user.email),
      });
    } else {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    next(error);
  }
};

//  Gets all users
//  Get /api/v1/users
//  Public
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).populate("books").populate("fairyBooks");
    res.send(users);
  } catch (error) {
    next(error);
  }
};

//  Deletes user
//  Get /api/v1/users/delete/:id
//  Private
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("User not found");
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};

export const getLoggedUser = async (req, res, next) => {
  try {
    // {_id , name , email , books}
    const user = await User.findById(req.user.id);
    if (!user) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("User not found");
    }
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      books: user.books,
    });
  } catch (error) {
    next(error);
  }
};
