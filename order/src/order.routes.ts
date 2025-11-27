import express from 'express';
import OrderController from './order.controller.js';

const router = express.Router();

router.post('/create-order', OrderController.createOrder);
export default router;