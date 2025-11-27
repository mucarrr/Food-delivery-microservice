import type { Request, Response, NextFunction } from "express";
export type RouteParams = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export type Role = "customer" | "admin" | "restaurant_owner" | "courier";
export interface JWTPayload {
    userId: string;
    role: Role;
    iat: number;
    exp: number;
}