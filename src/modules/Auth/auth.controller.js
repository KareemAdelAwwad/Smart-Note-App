import { Router } from "express";
import { authenticationMiddleware, errorHandler, MulterMiddleware, ValidationMiddleware } from "../../middlewares/index.js";
import * as Service from "./auth.service.js";
import * as ValidationSchema from "./auth.validation.js";

/**
 * Auth Controller
 * Handles user registration, login, logout, password reset, and profile picture upload APIs.
 */
const authController = Router();

/**
 * @route POST /register
 * @desc Register a new user
 * @access Public
 */
authController.post("/register", ValidationMiddleware(ValidationSchema.registerValidation), errorHandler(Service.Register));
/**
 * @route POST /login
 * @desc Login user and return JWT token
 * @access Public
 */
authController.post("/login", ValidationMiddleware(ValidationSchema.loginValidation), errorHandler(Service.Login));
/**
 * @route POST /logout
 * @desc Logout user and revoke JWT token
 * @access Private
 */
authController.post("/logout", errorHandler(Service.Logout));
/**
 * @route POST /forgot-password
 * @desc Send OTP to user's email for password reset
 * @access Public
 */
authController.post("/forgot-password", ValidationMiddleware(ValidationSchema.forgotPasswordValidation), errorHandler(Service.ForgotPassword));
/**
 * @route POST /reset-password
 * @desc Reset user password using OTP
 * @access Public
 */
authController.post("/reset-password", ValidationMiddleware(ValidationSchema.resetPasswordValidation), errorHandler(Service.ResetPassword));
/**
 * @route PATCH /upload-profile-pic
 * @desc Upload and update user's profile picture
 * @access Private
 */
authController.patch("/upload-profile-pic", authenticationMiddleware, MulterMiddleware("profilePic"), errorHandler(Service.UploadProfilePic));

export { authController };

