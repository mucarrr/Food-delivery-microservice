import catchAsync from './utils/index.js';
import OrderService from './order.service.js';    
import { orderSchema, validateDTO } from './order.dto.js';

export class OrderController {
    createOrder = catchAsync(async (req, res, next) => {
        const body = await validateDTO(orderSchema, req.body);
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const order = await OrderService.createOrder(body, userId);
        res.status(201).json({
            status: 'success',
            data: order,
        });
    })
    getOrdersByUserId = catchAsync(async (req, res, next) => {})
    getOrderById = catchAsync(async (req, res, next) => {})
    updateOrderStatus = catchAsync(async (req, res, next) => {})
}
export default new OrderController();