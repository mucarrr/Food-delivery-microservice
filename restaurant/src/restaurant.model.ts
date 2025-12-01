import mongoose from 'mongoose';
import type { IRestaurant } from './types/index.js';
import type { IMenu } from './types/index.js';
import { Schema } from 'mongoose';

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
 const MenuSchema = new mongoose.Schema<IMenu>({
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: "Restaurant",
        required: [true, "Restaurant ID is required"],
        trim: true,
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
        min: [0, "Price must be greater than 0"],
    },
    image: {
        type: String,
        required: [true, "Image is required"],
        default: null,
    },
    category: {
        type: String,
        required: [true, "Category is required"],
        trim: true,
    },
    ingredients: {
        type: [String],
        required: [true, "Ingredients are required"],
        ingredients: [],
    },
    allergens: {
        type: [String],
        required: [true, "Allergens are required"],
        allergens: [],
    },
    isVegetarian: {
        type: Boolean,
        default: false,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    preparationTime: {
        type: Number,
        required: [true, "Preparation time is required"],
        min: [0, "Preparation time must be greater than 0"],
    }
 }, { timestamps: true, 
    toJSON: {
        transform: function(doc: any, ret: any) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    }
 });

export const RestaurantModel = mongoose.model<IRestaurant>("Restaurant", restaurantSchema, "restaurants");
export const MenuModel = mongoose.model<IMenu>("Menu", MenuSchema, "menus");