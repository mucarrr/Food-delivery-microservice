import type { Request, Response, NextFunction } from "express";
export type RouteParams = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export type Role = "customer" | "admin" | "restaurant_owner" | "courier";

export interface IUser {
    _id?: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: Date;
    email: string;
    password: string;
    isActive: boolean;
}
export interface JWTPayload {
    userId: string;
    role: Role;
    iat: number;
    exp: number;
}
