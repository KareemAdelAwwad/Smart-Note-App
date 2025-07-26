import Joi from "joi";
export const createNoteSchema = {
  body: Joi.object({
    title: Joi.string().min(3).max(100).required(),
    content: Joi.string().min(10).required()
  })
};

export const noteByIdSchema = {
  params: Joi.object({
    id: Joi.string().required()
  })
};