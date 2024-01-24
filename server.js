import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { errorHandler } from "./middlewares/errorMiddleware.js";
import usersRoute from "./routes/usersRoute.js";
import booksRoute from "./routes/booksRoute.js";
import fairyRoute from "./routes/fairyRoute.js";
import commentsRouter from "./routes/commentsRoute.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// https://books-library-backend.cyclic.app

app.use("/api/v1/users", usersRoute);
app.use("/api/v1/books", booksRoute);
app.use("/api/v1/fairy", fairyRoute);
app.use("/api/v1/comments", commentsRouter);

app.use(errorHandler);

const port = process.env.PORT || 9999;

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
