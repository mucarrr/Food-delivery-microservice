import type { Request, Response, NextFunction } from "express";
import type { Types } from "mongoose";
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
export interface IMenu extends Document {
    restaurantId: Types.ObjectId;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    ingredients: string[];
    allergens: string[];
    isVegetarian: boolean;
    isAvailable: boolean;
    preparationTime: number;
    createdAt: Date;
    updatedAt: Date;
}