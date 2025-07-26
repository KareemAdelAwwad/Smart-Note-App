import { emailEventEmitter, RedisClient } from "../../config/indext.js";
import { User } from "../../db/models/index.js";
import { forgetPasswordTemplate, passwordResetSuccessTemplate } from "../../utils/emailTamplates.js";
import { generateJWT, verifyJWT } from "../../utils/JWT.js";
import { comparePassword } from "../../utils/passwordHash.js";

/**
 * Register a new user
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const Register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User with this email already exists" });
  };
  const user = new User({ name, email, password });
  await user.save();
  return res.status(201).json({ message: "User registered successfully" });
};

/**
 * Login user and return JWT token
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const Login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid email or password" });

  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) return res.status(401).json({ message: "Invalid email or password" });

  const token = generateJWT({ id: user._id, email: user.email });

  return res.status(200).json({
    message: "Login successful",
    token,
  });
};

/**
 * Logout user and revoke JWT token
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const Logout = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const { exp } = verifyJWT(token);
  await RedisClient.setEx(token, exp - Math.floor(Date.now() / 1000), "revoked");

  return res.status(200).json({ message: "Logout successful" });
};

/**
 * Upload and update user's profile picture
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const UploadProfilePic = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const profilePic = req.file.filename;
  const directURL = `${req.protocol}://${req.get("host")}/uploads/${profilePic}`;

  await User.findByIdAndUpdate(req.user.id, { profilePicturePath: `/uploads/${profilePic}` });

  return res.status(200).json({ message: "Profile picture uploaded successfully", directURL });
};

/**
 * Send OTP to user's email for password reset
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const ForgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const OTP = Math.floor(100000 + Math.random() * 900000).toString();
  await RedisClient.set(`otp:${user._id}`, OTP, { EX: 600 }); // OTP valid for 10 minutes

  emailEventEmitter.emit("sendEmail", {
    to: user.email,
    subject: "Password Reset OTP",
    html: forgetPasswordTemplate(user.name, OTP),
  });

  return res.status(200).json({ message: "OTP sent to your email" });
};

/**
 * Reset user password using OTP
 * @param {Request} req
 * @param {Response} res
 * @returns {Promise<Response>}
 */
export const ResetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const storedOTP = await RedisClient.get(`otp:${user._id}`);
  if (otp !== storedOTP) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  user.password = newPassword;
  await user.save();
  await RedisClient.del(`otp:${user._id}`);

  emailEventEmitter.emit("sendEmail", {
    to: user.email,
    subject: "Password Reset Successful",
    html: passwordResetSuccessTemplate(user.name),
  });

  return res.status(200).json({ message: "Password reset successful" });
};
