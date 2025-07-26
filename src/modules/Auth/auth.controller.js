import { Router } from "express";
import { authenticationMiddleware, errorHandler, MulterMiddleware, ValidationMiddleware } from "../../middlewares/index.js";
import * as Service from "./auth.service.js";
import * as ValidationSchema from "./auth.validation.js";

const authController = Router();

authController.post("/register", ValidationMiddleware(ValidationSchema.registerValidation), errorHandler(Service.Register));
authController.post("/login", ValidationMiddleware(ValidationSchema.loginValidation), errorHandler(Service.Login));
authController.post("/logout", errorHandler(Service.Logout));
authController.post("/forgot-password", ValidationMiddleware(ValidationSchema.forgotPasswordValidation), errorHandler(Service.ForgotPassword));
authController.post("/reset-password", ValidationMiddleware(ValidationSchema.resetPasswordValidation), errorHandler(Service.ResetPassword));
authController.patch("/upload-profile-pic", authenticationMiddleware, MulterMiddleware("profilePic"), errorHandler(Service.UploadProfilePic));

export { authController };

