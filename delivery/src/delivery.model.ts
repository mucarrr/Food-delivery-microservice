import { Schema } from "mongoose";
import type { location, IDelivery, ICourier } from "./types/index.js";
import mongoose from "mongoose";


const LocationSchema = new Schema<location>({
    latitude: {
        type: Number,
        required: [true, "Latitude is required"],
    },
    longitude: {
        type: Number,
    },
});

const deliverySchema = new Schema<IDelivery>({
    orderId: {
        type: String,
        required: [true, "Order ID is required"],
    },
    courierId: {
        type: String,
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: ['pending', 'confirmed', 'preparing', 'ready_for_delivery', 'on_the_way', 'delivered', 'cancelled'],
        default: 'pending',
    },
    location: {
        type: LocationSchema,
        default: null,
    },
    actualDeliveryTime: {
        type: Date,
        default: null,
    },
    notes: {
        type: String,
        default: null,
    },
    acceptedAt: {
        type: Date,
        default: null,
    }
}, { timestamps: true,
    toJSON: {
        transform: function(doc: any, ret: any) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        },
    }
} );
const courierSchema = new Schema<ICourier>({
    firstName: {
        type: String,
        required: [true, "First name is required"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email must be unique"],
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
    },
    password: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: ['available', 'busy', 'off_duty'],
        default: 'available',
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
export const Courier = mongoose.model<ICourier>("Courier", courierSchema, "couriers");
export const Delivery = mongoose.model<IDelivery>("Delivery", deliverySchema, "deliveries");