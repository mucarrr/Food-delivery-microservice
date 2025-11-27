import type { Request, Response, NextFunction } from "express";
export type RouteParams = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export type Role = "customer" | "admin" | "restaurant_owner" | "courier";
export interface JWTPayload {
    userId: string;
    role: Role;
    iat: number;
    exp: number;
}

export interface IRestaurant extends Document {
    name: string;
    description: string;
    address: string;
    phone: string;
    email: string;
    categories: string[];
    deliveryTime: number;
    minOrderAmount: number;
    deliveryFee: number;
    isActive: boolean;
    isOpen: boolean;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
}