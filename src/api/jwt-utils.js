import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function createToken(user) {
  const payload = {
    userId: user._id.toString(),
    email: user.email,
  };

  const secret = process.env.JWT_SECRET || process.env.cookie_password || "supersecretkey";
  return jwt.sign(payload, secret);
}

export function decodeToken(token) {
  const secret = process.env.JWT_SECRET || process.env.cookie_password || "supersecretkey";
  return jwt.verify(token, secret);
}

export async function validate(decoded) {
  return { isValid: !!decoded.userId };
}
