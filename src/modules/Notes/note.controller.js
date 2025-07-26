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

const noteController = Router();

noteController.post("/",
  authenticationMiddleware,
  ValidationMiddleware(ValidationSchema.createNoteSchema),
  errorHandler(Service.createNote)
);

noteController.get("/",
  authenticationMiddleware,
  errorHandler(Service.getNotesByUser)
);

noteController.delete("/:id",
  authenticationMiddleware,
  ValidationMiddleware(ValidationSchema.noteByIdSchema),
  errorHandler(Service.deleteNote)
);

noteController.put("/:id",
  authenticationMiddleware,
  ValidationMiddleware(ValidationSchema.noteByIdSchema),
  errorHandler(Service.updateNote)
);

noteController.post("/:id/summarize",
  AiLimiter,
  authenticationMiddleware,
  ValidationMiddleware(ValidationSchema.noteByIdSchema),
  errorHandler(Service.summarizeNote)
);

export { noteController };

