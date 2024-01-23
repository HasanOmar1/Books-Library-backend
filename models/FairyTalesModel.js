import mongoose from "mongoose";

const FairyTaleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  author: {
    type: String,
    required: [true, "please add an author"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  categories: {
    type: String,
    required: [true, "Please add a category"],
  },
  content: {
    type: [String],
    required: [true, "Please add content"],
  },
  img: {
    type: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
});

const FairyTale = mongoose.model("FairyBooks", FairyTaleSchema);

export default FairyTale;
