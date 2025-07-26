import jwt from "jsonwebtoken";

export const generateJWT = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });

export const verifyJWT = (token) => jwt.verify(token, process.env.JWT_SECRET);

