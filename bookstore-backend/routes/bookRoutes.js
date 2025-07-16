import express from "express";
import { upload } from "../utils/cloudinary.js";
import {
  getBooks, getBookById, createBook, updateBook, deleteBook
} from "../controllers/bookController.js";
import { verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", verifyAdmin, createBook);
router.put("/:id", verifyAdmin, updateBook);
router.delete("/:id", verifyAdmin, deleteBook);
router.post("/upload", verifyAdmin, upload.single("image"), (req, res) => {
  res.json({ url: req.file.path });
});

export default router;
