import type { Request, Response, NextFunction } from "express";
export type RouteParams = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export type Role = "customer" | "admin" | "restaurant_owner" | "courier";
export interface JWTPayload {
    userId: string;
    role: Role;
    iat: number;
    exp: number;
}
export interface OrderItems {
    itemId: string;
    name: string;
    price:number;
    quantity: number;
}
export interface DeliveryAddress {
    title: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    isDefault: boolean;
}
export type OrderStatus = 'pending' | 'confirmed' | "preparing" | "ready_for_delivery" | "on_the_way" | "delivered" | 'cancelled';
export interface IOrder {
    userId: string;
    restaurantId: string;
    items: OrderItems[];
    totalPrice?: number;
    deliveryAddress: DeliveryAddress;
    paymentMethod: 'cash' | 'card' | 'wallet' | 'other';
    status: OrderStatus;
    specialInstructions?: string;
    createdAt: Date;
    updatedAt: Date;
}
