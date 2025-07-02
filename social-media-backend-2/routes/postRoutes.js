import express from "express";
import {
  createPost,
  getAllPosts,
  toggleLike,
  addComment,
  deletePost,
  toggleSavePost,
  sharePost,
  getPostsByUser,
} from "../controllers/postController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uplaod.js";

const router = express.Router();

router.post("/", authMiddleware, upload.single("image"), createPost);
router.get("/", authMiddleware, getAllPosts);
router.get("/user/:userId", authMiddleware, getPostsByUser);

router.put("/like/:id", authMiddleware, toggleLike);
router.put("/comment/:id", authMiddleware, addComment);
router.delete("/:id", authMiddleware, deletePost);

router.put("/save/:id", authMiddleware, toggleSavePost);
router.put("/share/:id", authMiddleware, sharePost);

export default router;
