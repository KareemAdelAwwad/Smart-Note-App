import { logger } from "../utils/logger.js";

export const errorHandler = (api) => (req, res, next) => {
  try {
    const result = api(req, res, next);
    // Check if the result is a Promise
    if (result && typeof result.catch === "function") {
      result.catch((error) => {
        logger.error(error, `🚫 Error in ${req.url} from error handler middleware`);
        return next(error);
      });
    }
  } catch (error) {
    logger.error(error, `🚫 Error in ${req.url} from error handler middleware`);
    return next(error);
  }
};

export const globalErrorHandler = (error, req, res) => {
  logger.error(error, "🚫 Global Error Handler:");
  return res.status(500).json({ message: "💾 Internal Server Error", error: error.message });
};