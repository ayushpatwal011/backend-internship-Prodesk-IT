import fs from "fs";
import { PdfReader } from "pdfreader";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// PDF extraction as promise
function extractTextFromPDF(pdfPath) {
  return new Promise((resolve, reject) => {
    const reader = new PdfReader();
    let text = "";

    reader.parseFileItems(pdfPath, (err, item) => {
      if (err) reject(err);
      else if (!item) resolve(text); // End of file
      else if (item.text) text += item.text + " ";
    });
  });
}

export const uploadResume = async (req, res) => {
  try {
    const pdfPath = req.file.path;
    const resumeText = await extractTextFromPDF(pdfPath); // ✅ Use await directly

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `This is a resume:\n\n${resumeText}\n\nPlease review this resume and provide:
1. Resume Score (1-100%)
2.  Job Roles
3. Improvements Needed
4. Missing Skills 
etc

Format response in json formate having keys and values like : "rating" : "78%", "skills": " js, c,cpp"`;

    const result = await model.generateContent(prompt);
    const response = await result.response.text();

    res.status(200).json({
      success: true,
      message: "Resume reviewed successfully",
      review: response,
    });
  } catch (err) {
    console.error("Gemini review failed:", err.message);
    res.status(500).json({
      success: false,
      message: "Resume review failed",
      error: err.message,
    });
  }
};
