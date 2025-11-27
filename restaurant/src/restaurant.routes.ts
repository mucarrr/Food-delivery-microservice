import express from 'express';
import RestaurantController from './restaurant.controller.js';
import { authenticate, authorize } from './restaurant.middleware.js';

const router = express.Router();

router.get('/restaurants', authenticate, RestaurantController.getRestaurants);
router.get('/restaurants/:id', authenticate, RestaurantController.getRestaurantById);
router.get('/restaurants/:id/menu', authenticate, RestaurantController.getRestaurantMenu);
router.post('/restaurants/:id/menu', authenticate, authorize(["admin", "restaurant_owner"]), RestaurantController.createRestaurantMenu);
router.post('/restaurants', authenticate, authorize(["admin", "restaurant_owner"]), RestaurantController.createRestaurant);
export default router;