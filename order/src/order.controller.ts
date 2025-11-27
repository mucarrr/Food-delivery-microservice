import catchAsync from './utils/index.js';
import OrderService from './order.service.js';    

export class OrderController {
    createOrder = catchAsync(async (req, res, next) => {
        res.send('Create Order');
    });
}
export default new OrderController();