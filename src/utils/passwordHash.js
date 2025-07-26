import bcrypt from "bcrypt";

const hashPassword = async (password) => {
  const salt = bcrypt.genSaltSync(+process.env.SALT_ROUNDS || 10);
  return bcrypt.hashSync(password, salt);
};

const comparePassword = async (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

export { comparePassword, hashPassword };

