import express from 'express';
import OrderController from './order.controller.js';
import { authenticate, authorize } from './order.middleware.js';
const router = express.Router();

router.post('/', authenticate, OrderController.createOrder);
router.get('/user/:userId', authenticate, OrderController.getOrdersByUserId);
router.get('/:orderId', authenticate, OrderController.getOrderById);
router.patch('/:orderId/status', authenticate, authorize(['admin','restaurant_owner']), OrderController.updateOrderStatus);

export default router;