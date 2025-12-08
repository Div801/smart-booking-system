import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

const hashPassword = async (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

const comparePassword = async (password, hashed) => {
  return bcrypt.compare(password, hashed);
};

export { hashPassword, comparePassword };
