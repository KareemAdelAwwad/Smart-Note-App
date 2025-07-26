import jwt from "jsonwebtoken";

/**
 * Generate a JWT token
 * @function generateJWT
 * @param {Object} payload - Data to encode in JWT
 * @returns {string} JWT token
 */
export const generateJWT = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

/**
 * Verify a JWT token
 * @function verifyJWT
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded payload
 */
export const verifyJWT = (token) => jwt.verify(token, process.env.JWT_SECRET);

