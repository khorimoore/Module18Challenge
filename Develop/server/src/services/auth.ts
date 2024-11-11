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
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  // Check if the token exists
  if (!authHeader) {
    return res.sendStatus(401); // Unauthorized if no token provided
  }

  const token = authHeader.split(' ')[1]; // Extract the token part (if format is "Bearer <token>")
  const secretKey = process.env.JWT_SECRET_KEY || '';

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden if token is invalid
    }

    // Attach user data to the request
    req.user = user as JwtPayload;
    next();
  });
};

// Function to create and sign a JWT token for user authentication
export const signToken = ({ username, email, _id }: { username: string; email: string; _id: unknown }) => {
  const payload = { username, email, _id };
  const secretKey = process.env.JWT_SECRET_KEY || '';

  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};