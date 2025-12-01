import catchAsync from './utils/index.js';
import OrderService from './order.service.js';    
import { orderSchema, validateDTO } from './order.dto.js';
import { isValidObjectId } from 'mongoose';

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
            message: 'Order created successfully',
            status: 'success',
            data: order,
        });
    })
    getOrdersByUserId = catchAsync(async (req, res, next) => {
        const userId = req.params.userId;
        if (!userId || !isValidObjectId(userId)) {
            res.status(400).json({ message: "Invalid user ID" });
            return;
        }
        const orders = await OrderService.getOrdersByUserId(userId);
        res.status(200).json({
            message: `${orders.length} orders fetched successfully`,
            status: 'success',
            data: orders,
        });
    })
    getOrderById = catchAsync(async (req, res, next) => {
        const orderId = req.params.orderId;
        if (!orderId) {
            res.status(400).json({ message: "Order ID is required" });
            return;
        }
        if (!isValidObjectId(orderId)) {
            res.status(400).json({ message: "Order is not found" });
            return;
        }
        const order = await OrderService.getOrderById(orderId);
        res.status(200).json({
            message: 'Order fetched successfully',
            status: 'success',
            data: order,
        });
    })
    updateOrderStatus = catchAsync(async (req, res, next) => {
        const orderId = req.params.orderId;
        if (!orderId || !isValidObjectId(orderId)) {
            res.status(400).json({ message: "Invalid order ID" });
            return;
        }
        const order = await OrderService.updateOrderStatus(orderId, req.body.status);
        res.status(200).json({
            message: 'Order status updated successfully',
            status: 'success',
    })})
}
export default new OrderController();