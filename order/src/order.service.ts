// business logic 
import type { OrderInput } from './order.dto.js';
import OrderModel from './order.model.js';


class OrderService {
    async createOrder(body: OrderInput, userId: string) {
        const order = await OrderModel.create({ ...body, userId });

        // todo: send order to delivery service
        return {
            message: 'Order created successfully',
            order,
        };
    }
}
export default new OrderService();