import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    lowerCase: true,
    unique: true,
    minlength: [3, "Your name must be at least 3 characters long"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowerCase: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [2, "Password length must be at least 2 characters long"],
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Books",
    },
  ],
  fairyBooks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FairyBooks",
    },
  ],
});

const User = mongoose.model("Users", usersSchema);

export default User;
