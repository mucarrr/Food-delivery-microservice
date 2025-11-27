import express from 'express';
import DeliveryController from './delivery.controller.js';

const router = express.Router();

router.post('/register', DeliveryController.register);
router.post('/login', DeliveryController.login);
router.post('/logout', DeliveryController.logout);
router.get('/profile', DeliveryController.profile);
export default router;