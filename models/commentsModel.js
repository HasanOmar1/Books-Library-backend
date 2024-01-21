import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
  bookName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Books",
  },
  comment: {
    type: {},
    required: true,
  },
});

const Comments = mongoose.model("Comments", commentSchema);

export default Comments;
