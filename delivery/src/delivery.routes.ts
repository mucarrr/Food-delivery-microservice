import express from 'express';
import DeliveryController from './delivery.controller.js';
import { authorize, authenticate } from './delivery.middleware.js';

const router = express.Router();

router.get('/', authenticate, authorize(["admin", "courier"]), DeliveryController.getOrders);
router.post('/:orderId/accept', authenticate, authorize(["courier", "admin"]), DeliveryController.acceptOrder);
router.patch('/:orderId/status', authenticate, authorize(["courier", "admin"]), DeliveryController.updateOrderStatus);
router.get('/:orderId/track', authenticate, DeliveryController.trackOrder);


export default router;