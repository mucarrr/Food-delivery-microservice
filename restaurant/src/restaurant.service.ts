// business logic 

import type { IRestaurant } from "./types/index.js";
import RestaurantModel from "./restaurant.model.js";
import type { GetRestaurantsQueryInput } from "./restaurant.dto.js";

class RestaurantService {
    async createRestaurant(data: IRestaurant, ownerId: string) {
        const newRestaurant = await RestaurantModel.create({ ...data, ownerId });
        return newRestaurant;
}
async getAllRestaurants(data: GetRestaurantsQueryInput) {
    const page = data.page;
    const limit = data.limit;
    const skip = (page - 1) * limit;

    const filters:Record<string, any> = {};
    if (data.category) {
        filters.categories = { $in: data.category.split(',') };
    }
    if (data.deliveryTime) {
        filters.deliveryTime = { $lte: data.deliveryTime };
    }
    if (data.minOrderAmount) {
        filters.minOrderAmount = { $lte: data.minOrderAmount };
    }
    if (data.name) {
        filters.name = { $regex: data.name, $options: 'i' };
    }

    const [restaurants, total] = await Promise.all([
        RestaurantModel.find(filters).skip(skip).limit(limit),
        RestaurantModel.countDocuments(filters),
    ]);
    
    return {restaurants, totalItems: total, totalPages: Math.ceil(total / limit), page, limit};
}   
async getRestaurantById(id: string) {
    const restaurant = await RestaurantModel.findById(id);
    if (!restaurant) {
        throw new Error("Restaurant not found");
    }
    return restaurant;
}
}
export default new RestaurantService();