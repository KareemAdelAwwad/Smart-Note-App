import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { authenticationMiddleware, errorHandler, ValidationMiddleware } from "../../middlewares/index.js";
import * as Service from "./note.service.js";
import * as ValidationSchema from "./note.validation.js";
const AiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  standardHeaders: false,
  legacyHeaders: false,
});

/**
 * Note Controller
 * Handles note creation, retrieval, update, deletion, and AI summarization APIs.
 */
const noteController = Router();

noteController.post("/",
  authenticationMiddleware,
  ValidationMiddleware(ValidationSchema.createNoteSchema),
  errorHandler(Service.createNote)
);

/**
 * @route POST /
 * @desc Create a new note
 * @access Private
 */

noteController.get("/",
  authenticationMiddleware,
  errorHandler(Service.getNotesByUser)
);

/**
 * @route GET /
 * @desc Get all notes for authenticated user
 * @access Private
 */

noteController.delete("/:id",
  authenticationMiddleware,
  ValidationMiddleware(ValidationSchema.noteByIdSchema),
  errorHandler(Service.deleteNote)
);

/**
 * @route DELETE /:id
 * @desc Delete a note by ID
 * @access Private
 */

noteController.put("/:id",
  authenticationMiddleware,
  ValidationMiddleware(ValidationSchema.noteByIdSchema),
  errorHandler(Service.updateNote)
);

/**
 * @route PUT /:id
 * @desc Update a note by ID
 * @access Private
 */

noteController.post("/:id/summarize",
  AiLimiter,
  authenticationMiddleware,
  ValidationMiddleware(ValidationSchema.noteByIdSchema),
  errorHandler(Service.summarizeNote)
);

/**
 * @route POST /:id/summarize
 * @desc Summarize a note using AI
 * @access Private
 */

export { noteController };

