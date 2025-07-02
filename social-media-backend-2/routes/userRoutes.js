import express from "express";
import {
  getMyProfile,
  updateProfile,
  followUser,
  unfollowUser,
  getUserProfileById,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uplaod.js";

const router = express.Router();

router.get("/me", authMiddleware, getMyProfile);
router.put("/update", authMiddleware, upload.single("avatar"), updateProfile);

router.get("/:id", authMiddleware, getUserProfileById);
router.post("/follow/:id", authMiddleware, followUser);
router.post("/unfollow/:id", authMiddleware, unfollowUser);

export default router;
