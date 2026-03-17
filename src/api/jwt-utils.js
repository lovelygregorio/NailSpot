/**
 * JWT Authentication Utility
 * 
 * This file handles JSON Web Token (JWT) functionality for the application.
 * It includes functions to create tokens, verify tokens, and validate users
 * for secure access to protected routes.
 */

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// load environment variables
dotenv.config();


// create a JWT token for a logged-in user and stores basic user info inside the token payload
export function createToken(user) {
  const payload = {
    userId: user._id.toString(),
    email: user.email,
  };


   // secret key used to sign the token (from .env for security)
  const secret = process.env.JWT_SECRET || process.env.cookie_password || "supersecretkey";
  return jwt.sign(payload, secret);
}


// decode the JWT token to extract the user information from the token payload
export function decodeToken(token) {
  const secret = process.env.JWT_SECRET || process.env.cookie_password || "supersecretkey";
  return jwt.verify(token, secret);
}

// validate the decoded token payload to ensure it contains the expected user information
export async function validate(decoded) {
  return { isValid: !!decoded.userId };
}
