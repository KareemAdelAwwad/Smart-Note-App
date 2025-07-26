import { RedisClient } from "../config/indext.js";
import { verifyJWT } from "../utils/JWT.js";
import { logger } from "../utils/logger.js";

/**
 * Authentication middleware to verify JWT tokens and check if they are revoked
 * @function authenticationMiddleware
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {Function} next - Express next function
 */
export const authenticationMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access token is required" });
    }

    // Check if token is revoked in Redis
    const isRevoked = await RedisClient.get(token);
    if (isRevoked) {
      return res.status(401).json({ message: "Token has been revoked" });
    }

    // Verify JWT token
    const decoded = verifyJWT(token);
    req.user = decoded;

    next();
  } catch (error) {
    logger.error(error, "🚫 Authentication error:",);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};