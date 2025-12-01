import mongoose from "mongoose";
import type { IOrder, OrderItems, DeliveryAddress } from "./types/index.js";

const OrderItemsSchema = new mongoose.Schema<OrderItems>({
    itemId: {
        type: String,
        required: [true, "Item ID is required"],
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
},{_id: false});
const DeliveryAddressSchema = new mongoose.Schema<DeliveryAddress>({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    street: {
        type: String,
        required: [true, "Street is required"],
    },
    city: {
        type: String,
        required: [true, "City is required"],
    },
    state: {
        type: String,
        required: [true, "State is required"],
    },
    zip: {
        type: String,
        required: [true, "Zip is required"],
    },
    country: {
        type: String,
        required: [true, "Country is required"],
    },
    isDefault: {
        type: Boolean,
        default: false,
    }},{_id: false})

const orderSchema = new mongoose.Schema<IOrder>({
    userId: {
        type: String,
        required: [true, "User ID is required"],
    },
    restaurantId: {
        type: String,
        required: [true, "Restaurant ID is required"],
    },
    items: {
        type: [OrderItemsSchema],
        required: [true, "Items are required"],
    },
    totalPrice: {
        type: Number,
        required: false,
    },
    deliveryAddress: {
        type: DeliveryAddressSchema,
        required: [true, "Delivery address is required"],
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment method is required"],
        enum: ['cash', 'card', 'wallet', 'other'],
    },
    status: {
        type: String,
        required: [true, "Status is required"],
        enum: ['pending', 'confirmed', 'preparing', 'ready_for_delivery', 'on_the_way', 'delivered', 'cancelled'],
        default: 'pending',
    },
    specialInstructions: {
        type: String,
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

export default mongoose.model<IOrder>("Order", orderSchema, "orders");