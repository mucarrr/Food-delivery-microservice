import catchAsync from './utils/index.js';
import RestaurantService from './restaurant.service.js';    
import type { IRestaurant } from "./types/index.js";
import { restaurantSchema, validateRestaurantDTO } from "./restaurant.dto.js";
import { getRestaurantsQuerySchema} from "./restaurant.dto.js";


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
    getRestaurantMenu = catchAsync(async (req, res, next) => {});
    createRestaurantMenu = catchAsync(async (req, res, next) => {});

    createRestaurant = catchAsync(async (req, res, next) => {
      const body = await validateRestaurantDTO(restaurantSchema, req.body);
      const ownerId = req.user?.userId;
      if (!ownerId) {
        return next(new Error("Owner ID is required"));
      }
      const newRestaurant = await RestaurantService.createRestaurant(body as IRestaurant, ownerId);
        res.status(201).json({
            status: 'success',
            data: body,
        });
    });
}
export default new RestaurantController();