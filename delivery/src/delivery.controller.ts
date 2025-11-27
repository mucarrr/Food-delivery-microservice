import catchAsync from './utils/index.js';
import DeliveryService from './delivery.service.js';    

export class DeliveryController {
    register = catchAsync(async (req, res, next) => {
        res.send('Register');
    });
    login = catchAsync(async (req, res, next) => {
        res.send('Login');
    });
    logout = catchAsync(async (req, res, next) => {
        res.send('Logout');
    });
    profile = catchAsync(async (req, res, next) => {
        res.send('Profile');
    });
}
export default new DeliveryController();