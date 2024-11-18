import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface JwtPayload {
  _id: unknown;
  username: string;
  email: string;
}

// Middleware to authenticate the token and attach user data to the request
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  // Check if the token exists
  if (!authHeader) {
    res.sendStatus(401); // Unauthorized if no token provided
    return;
  }

  const token = authHeader.split(' ')[1]; // Extract the token part (if format is "Bearer <token>")
  const secretKey = process.env.JWT_SECRET_KEY || '';

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      res.sendStatus(403); // Forbidden if token is invalid
      return;
    }

    // Attach user data to the request
    req.user = user as JwtPayload;
    next();
  });
};

// Function to create and sign a JWT token for user authentication
export const signToken = (
  username: string,
  email: string,
  _id: string
): string => {
  // Create the payload
  const payload = { username, email, _id };

  // Fetch the secret key from the environment variables
  const secretKey = process.env.JWT_SECRET_KEY || "";

  // Sign and return the JWT
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
};