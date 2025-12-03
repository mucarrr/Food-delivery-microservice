import catchAsync from './utils/index.js';
import DeliveryService from './delivery.service.js'; 
import { updateOrderStatusSchema, validateDTO } from './delivery.dto.js';

export class DeliveryController {
    getOrders = catchAsync(async (req, res, next) => {
        const orders = await DeliveryService.getOrders();
        if (!orders || orders.length === 0) {
            res.status(404).json({
                message: 'No orders found',
                status: 'error',
                data: [],
            });
            return;
        }else{
            res.status(200).json({
                message: `${orders.length} orders fetched successfully`,
                status: 'success',
                data: orders,
            });
        }
    });
    acceptOrder = catchAsync(async (req, res, next) => {
        const { orderId } = req.params;
        const courierId = req.user?.userId;
        if (!orderId || !courierId) {
            res.status(400).json({ message: "Order ID and courier ID are required" });
            return;
        }
        const order = await DeliveryService.acceptOrder(orderId, courierId);
        res.status(200).json({ message: "Order accepted successfully", status: "success", data: order });
    });
    updateOrderStatus = catchAsync(async (req, res, next) => {
        const { orderId } = req.params;
        const body = await validateDTO(updateOrderStatusSchema, req.body);

        if (!orderId) {
            res.status(400).json({ message: "Order ID is required" });
            return;
        }
        const updatedDelivery = await DeliveryService.updateOrderStatus(orderId, body);
        res.status(200).json({ message: "Order status updated successfully", status: "success", data: updatedDelivery });
    });
    trackOrder = catchAsync(async (req, res, next) => {
        const { orderId } = req.params;
        if (!orderId) {
            res.status(400).json({ message: "Order ID is required" });
            return;
        }
        const delivery = await DeliveryService.trackOrder(orderId);
        res.status(200).json(delivery);
    });
}
export default new DeliveryController();