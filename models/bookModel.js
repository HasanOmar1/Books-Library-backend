import mongoose from "mongoose";

const booksSchema = new mongoose.Schema({
  volumeInfo: {
    title: String,
    authors: [String],
    publisher: String,
    publishedDate: Date,
    description: String,
    pageCount: Number,
    categories: [String],
    averageRating: Number,
    maturityRating: String,
    imageLinks: {
      thumbnail: String,
    },
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
});

const Books = mongoose.model("Books", booksSchema);

export default Books;
