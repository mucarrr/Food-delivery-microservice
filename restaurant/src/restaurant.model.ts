import mongoose from 'mongoose';
import type { IRestaurant } from './types/index.js';

const restaurantSchema = new mongoose.Schema<IRestaurant>({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    description: {
        type: String,
        required: [true, "Description is required"],
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
    },
    categories: {
        type: [String],
        required: [true, "Categories are required"],
    },
    deliveryTime: {
        type: Number,
        required: [true, "Delivery time is required"],
    },
    minOrderAmount: {
        type: Number,
        required: [true, "Minimum order amount is required"],
    },
    deliveryFee: {
        type: Number,
        required: [true, "Delivery fee is required"],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isOpen: {
        type: Boolean,
        default: false,
    },
    ownerId: {
        type: String,
        required: [true, "Owner ID is required"],
    },
}, { timestamps: true, 
    toJSON: {
        transform: function(doc: any, ret: any) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    }
 });

export default mongoose.model<IRestaurant>("Restaurant", restaurantSchema, "restaurants");