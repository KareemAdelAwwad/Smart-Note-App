import fs from "fs";
import multer from "multer";
import path from "path";

const allowedTypes = ["image/jpeg", "image/png"];
const uploadPath = path.resolve("uploads");
const maxFileSize = 1024 * 1024 * 5; // 5MB

/**
 * Middleware for handling profile picture uploads using multer
 * @function MulterMiddleware
 * @returns {Function} multer middleware
 */
export const MulterMiddleware = () => {
  // Ensure upload directory exists
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("❗Invalid file type."), false);
    }
  };

  return multer({ storage, fileFilter, limits: { fileSize: maxFileSize } }).single("profilePic");
};