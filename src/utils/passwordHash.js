import bcrypt from "bcrypt";

/**
 * Hash a password using bcrypt
 * @function hashPassword
 * @param {string} password - Plain password
 * @returns {string} Hashed password
 */
const hashPassword = async (password) => {
  const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS || 10);
  return bcrypt.hashSync(password, salt);
};

/**
 * Compare a plain password with a hashed password
 * @function comparePassword
 * @param {string} password - Plain password
 * @param {string} hashedPassword - Hashed password
 * @returns {boolean} True if match, else false
 */
const comparePassword = async (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

export { comparePassword, hashPassword };

