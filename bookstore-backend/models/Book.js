import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  description: String,
  category: String,
  language: String,
  price: { type: Number, required: true },
  stock: { type: Number, default: 1 },
  pages: Number,
  frontPageImage: String,
}, { timestamps: true })

const Book = mongoose.model("Book", bookSchema);
export default Book;
