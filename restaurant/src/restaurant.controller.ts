import catchAsync from './utils/index.js';
import RestaurantService from './restaurant.service.js';    

export class RestaurantController {
    createRestaurant = catchAsync(async (req, res, next) => {
        res.send('Create Restaurant');
    });
}
export default new RestaurantController();