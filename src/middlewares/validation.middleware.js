/**
 * Middleware for validating request data using provided schema
 * @function ValidationMiddleware
 * @param {Object} schema - Zod validation schema
 * @returns {Function} Express middleware
 */
export const ValidationMiddleware = (schema) => (req, res, next) => {
  const schemaKeys = Object.keys(schema);

  for (const key of schemaKeys) {
    const { error } = schema[key].validate(req[key]);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
  }
  next();
};