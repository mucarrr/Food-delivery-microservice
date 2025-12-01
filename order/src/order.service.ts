// business logic 
import type { OrderInput } from './order.dto.js';
import OrderModel from './order.model.js';
import type { OrderStatus } from './types/index.js';


class OrderService {
    async createOrder(body: OrderInput, userId: string) {
        const order = await OrderModel.create({ ...body, userId });

        // todo: send order to delivery service
        return order;
    }
    async getOrdersByUserId(userId: string) {
        const orders = await OrderModel.find({ userId });
        return orders;
    } 
    async getOrderById(orderId: string) {
        const order = await OrderModel.findById(orderId);
        if (!order) {
            throw new Error("Order not found");
        }
        return order;
    }
    async updateOrderStatus(orderId: string, status: OrderStatus) {
        const order = await OrderModel.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            throw new Error("Order not found");
        }
        return order;
    }
}
export default new OrderService();