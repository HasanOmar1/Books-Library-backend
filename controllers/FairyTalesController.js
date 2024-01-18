import STATUS_CODE from "../constants/statusCode.js";
import FairyTale from "../models/FairyTalesModel.js";

export const getFairyBooks = async (req, res, next) => {
  try {
    const book = await FairyTale.find({});
    res.send(book);
  } catch (error) {
    next(error);
  }
};

export const addFairyBooks = async (req, res, next) => {
  try {
    const { title, content, img } = req.body;
    if (!title || !content || !img) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Please fill all fields");
    }
    const book = await FairyTale.create({
      title,
      content,
      img,
    });
    res.send(book);
  } catch (error) {
    next(error);
  }
};

export const removeFairyBook = async (req, res, next) => {
  try {
    const book = await FairyTale.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Book not found");
    }
    res.send(book);
  } catch (error) {
    next(error);
  }
};

export const updateFairyBook = async (req, res, next) => {
  try {
    const book = await FairyTale.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!book) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("Book not found");
    }
    res.send(book);
  } catch (error) {
    next(error);
  }
};
