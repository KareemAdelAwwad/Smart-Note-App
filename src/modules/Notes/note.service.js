import { aiSummarize } from "../../config/gemini.js";
import { Note } from "../../db/models/index.js";

export const createNote = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.id;
  const newNote = new Note({
    title,
    content,
    userId,
  });
  await newNote.save();
  return res.status(201).json({ message: "Note created successfully", note: newNote });
};

export const getNotesByUser = async (req, res) => {
  const userId = req.user.id;
  const notes = await Note.find({ userId }).sort({ createdAt: -1 });
  return res.status(200).json({ notes });
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const note = await Note.findOneAndDelete({ _id: id, userId });
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }
  return res.status(200).json({ message: "Note deleted successfully" });
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { title, content } = req.body;

  const updatedNote = await Note.findOneAndUpdate(
    { _id: id, userId },
    { title, content },
    { new: true }
  );

  if (!updatedNote) {
    return res.status(404).json({ message: "Note not found" });
  }

  return res.status(200).json({ message: "Note updated successfully", note: updatedNote });
};

export const summarizeNote = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const note = await Note.findOne({ _id: id, userId });
  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  // Placeholder for summarization logic
  const summary = await aiSummarize(note);
  if (!summary) {
    return res.status(500).json({ message: "Failed to summarize note" });
  }

  return res.status(200).json({ message: "Note summarized successfully", summary });
};