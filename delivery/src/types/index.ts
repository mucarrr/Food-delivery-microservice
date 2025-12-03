import type { Request, Response, NextFunction } from "express";
export type RouteParams = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export type Role = "customer" | "admin" | "restaurant_owner" | "courier";

export interface IUser{
    _id: string;
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
export type OrderStatus = 'pending' | 'confirmed' | "preparing" | "ready_for_delivery" | "on_the_way" | "delivered" | 'cancelled';

export type location = {
    latitude: number;
    longitude: number;
}
export interface IDelivery {
    orderId: string;
    courierId?: string;
    status: OrderStatus;
    location?: location;
    actualDeliveryTime?: Date;
    notes?: string;
    acceptedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export interface IOrder {
    _id: string;
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
export interface ICourier {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    status: 'available' | 'busy' | 'off_duty';
    createdAt: Date;
    updatedAt: Date;
}