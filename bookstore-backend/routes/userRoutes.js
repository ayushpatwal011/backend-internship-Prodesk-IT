import express from "express";
import { addToFavorites, getFavorites } from "../controllers/userController.js";
import { verifyUser } from "../middleware/auth.js";

const router = express.Router();

router.post("/favorites/:bookId", verifyUser, addToFavorites);
router.get("/favorites", verifyUser, getFavorites);

export default router;
