import { Request } from "express";

export interface User {
  id: string;
  email: string;
  password: string;
  role: string;
  refreshToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
    }
  }
}
