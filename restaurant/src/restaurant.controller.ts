import catchAsync from './utils/index.js';
import RestaurantService from './restaurant.service.js';    
import type { IRestaurant } from "./types/index.js";
import { restaurantSchema, validateRestaurantDTO, menuSchema, getRestaurantsQuerySchema } from "./restaurant.dto.js";
import type { IMenu } from "./types/index.js";

export class RestaurantController {
    getRestaurants = catchAsync(async (req, res, next) => {
        const query = await validateRestaurantDTO(getRestaurantsQuerySchema, req.query);

        const result = await RestaurantService.getAllRestaurants(query);
        res.status(200).json({
            message: `${result.restaurants.length} restaurants fetched successfully`,
            status: 'success',
            data: result,
        });
    });
    getRestaurantById = catchAsync(async (req, res, next) => {
        const id = req.params.id!;
        if (!id) {
            return next(new Error("Restaurant ID is required"));
        }
        const restaurant = await RestaurantService.getRestaurantById(id);
        res.status(200).json({
            message: "Restaurant fetched successfully",
            status: 'success',
            data: restaurant,
        });
    });
    getRestaurantMenu = catchAsync(async (req, res, next) => {
        const restaurantId = req.params.id!;
        const category = req.query.category as string | undefined;
        if (!restaurantId) {
            return next(new Error("Restaurant ID is required"));
        }
        const menu = await RestaurantService.getRestaurantMenu(restaurantId, category);
        res.status(200).json({
            message: `${menu.length} menu items fetched successfully`,
            status: 'success',
            data: menu,
        });
    });

    createRestaurant = catchAsync(async (req, res, next) => {
      const body = await validateRestaurantDTO(restaurantSchema, req.body);
      const restaurantId = req.params.id!;
      if (!restaurantId) {
        return next(new Error("Restaurant ID is required"));
      }
      const newRestaurant = await RestaurantService.createRestaurant(body as IRestaurant, restaurantId as string);
      res.status(201).json({
        status: 'success',
        data: newRestaurant,
      });
    });
    createRestaurantMenu = catchAsync(async (req, res, next) => {
        const body = await validateRestaurantDTO(menuSchema, req.body);
        const restaurantId = req.params.id!;
        if (!restaurantId) {
            return next(new Error("Restaurant ID is required"));
        }
        const newMenu = await RestaurantService.createRestaurantMenu(body as IMenu, restaurantId);
        res.status(201).json({
            status: 'success',
            data: body,
        });
    });
}
export default new RestaurantController();