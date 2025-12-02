// business logic 
import type { OrderInput } from './order.dto.js';
import OrderModel from './order.model.js';
import type { OrderStatus } from './types/index.js';
import RabbitMQService from './rabbitmq.service.js';

class OrderService {
    private initialized: boolean = false;
    async initialize(){
        if(!this.initialized){
            await RabbitMQService.initialize();
            this.initialized = true;
            console.log('RabbitMQ initialized');
        }else{
            console.log('RabbitMQ already initialized');
        }
    }

    async createOrder(body: OrderInput, userId: string) {
        await this.initialize();
        const order = await OrderModel.create({ ...body, userId });

        await RabbitMQService.publishMessage('order.created', { orderId: order._id, userId });
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
        await this.initialize();
        const order = await OrderModel.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            throw new Error("Order not found");
        }
        await RabbitMQService.publishMessage('order.status_updated', order);
        return order;
    }
}
export default new OrderService();