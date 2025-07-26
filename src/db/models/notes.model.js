import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

// Add pagination plugin
noteSchema.plugin(mongoosePaginate);

export const Note = mongoose.models.Note || mongoose.model("Note", noteSchema);
