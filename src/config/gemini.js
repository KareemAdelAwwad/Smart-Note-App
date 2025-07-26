import { GoogleGenAI } from "@google/genai";
import { logger } from "../utils/logger.js";

const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// AI Summarization
export const aiSummarize = async (note) => {
  try {
    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Summarize the following note content:\n\nTitle: ${note.title}\nContent: ${note.content} \n System Note: Summarize the note in a concise manner, focusing on the main points and key details. \n Language: The same language as the note content.`,
    });

    return response.text;
  } catch (error) {
    logger.error(error, "Error summarizing note:");
    throw new Error("Failed to summarize note");
  }
};