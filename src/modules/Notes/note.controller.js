import { Router } from "express";
import { authenticationMiddleware, errorHandler, ValidationMiddleware } from "../../middlewares/index.js";
import * as Service from "./note.service.js";
import * as ValidationSchema from "./note.validation.js";

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
  authenticationMiddleware,
  ValidationMiddleware(ValidationSchema.noteByIdSchema),
  errorHandler(Service.summarizeNote)
);

export { noteController };

