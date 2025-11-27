import mongoose from "mongoose";
import type { IUser } from "./types/index.js";

const userSchema = new mongoose.Schema<IUser>({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email must be unique"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    firstName: {
        type: String,
        required: [true, "First name is required"],
    },    
        lastName: {
        type: String,
        required: [true, "Last name is required"],
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
    },
    address: {
        type: String,
        required: [true, "Address is required"],
    },
    role: {
        type: String,
        enum: ["customer", "admin", "restaurant_owner", "courier"],
        required: [true, "Role is required"],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    lastLogin: {
        type: Date,
    },

},{ timestamps: true,
    toJSON: {
        transform: function(doc: any, ret: any) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.password;
            delete ret.__v;
        },
    }
 });

export default mongoose.model<IUser>("User", userSchema, "users");