import mongoose from "mongoose";

const FairyTaleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  content: {
    type: [String],
    required: [true, "Please add content"],
  },
  img: {
    type: {},
    required: [true, "Please add an img"],
  },
});

const FairyTale = mongoose.model("FairyBooks", FairyTaleSchema);

export default FairyTale;
