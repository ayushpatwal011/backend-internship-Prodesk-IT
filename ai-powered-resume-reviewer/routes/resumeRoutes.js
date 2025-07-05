import express from "express";
import multer from "multer";
import { uploadResume } from "../controllers/resumeController.js";
import fs from "fs"

const router = express.Router()

const uploadDir = "uploads";

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/upload", upload.single("resume"), uploadResume);

export default router;
