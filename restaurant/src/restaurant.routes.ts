import express from 'express';
import RestaurantController from './restaurant.controller.js';

const router = express.Router();

router.post('/create-restaurant', RestaurantController.createRestaurant);
export default router;