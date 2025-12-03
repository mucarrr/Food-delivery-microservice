// business logic 
import type { UpdateOrderStatusInput } from './delivery.dto.js';
import { Delivery, Courier } from './delivery.model.js';
import RabbitMQService from './rabbitmq.service.js';

class DeliveryService {
    private initialized: boolean = false;
constructor(){
    this.initialize();
}
private async initialize(){
    if(!this.initialized){
        await RabbitMQService.initialize();
        this.initialized = true;
        console.log('RabbitMQ initialized');
    }else{
        console.log('RabbitMQ already initialized');
    }
}
async getOrders(){
    const orders = await Delivery.find({ status: { $in: ['pending', 'ready_for_delivery'] } });
    return orders;
}
async acceptOrder(orderId: string, courierId: string){
    const order = await Delivery.findOneAndUpdate({ orderId }, { status: 'confirmed', courierId: courierId, acceptedAt: new Date() }, { new: true });
    await Courier.findByIdAndUpdate(courierId, { status: 'busy' });
    if(!order){
        throw new Error('Order not found');
    }
    return order;
}
async updateOrderStatus(orderId: string, body: UpdateOrderStatusInput){
    const delivery = await Delivery.findOne({ orderId });
    if(!delivery){
        throw new Error('Order not found');
    }
    
    let updatedDelivery;
    
    if(body.status === 'on_the_way'){
        updatedDelivery = await Delivery.findOneAndUpdate(
            { orderId }, 
            { status: 'on_the_way', location: body.location },
            { new: true }
        );
    }
    if(body.status === 'delivered'){
        updatedDelivery = await Delivery.findOneAndUpdate(
            { orderId }, 
            { status: 'delivered', actualDeliveryTime: new Date() },
            { new: true }
        );
        if(delivery.courierId){
            await Courier.findByIdAndUpdate(delivery.courierId, { status: 'available' });
        }
    }
    if(body.status === 'cancelled'){
        updatedDelivery = await Delivery.findOneAndUpdate(
            { orderId }, 
            { status: 'cancelled', courierId: null, acceptedAt: null, notes: body.notes },
            { new: true }
        );
        if(delivery.courierId){
            await Courier.findByIdAndUpdate(delivery.courierId, { status: 'available' });
        }
    }
    
    if(!updatedDelivery){
        throw new Error('Order not found');
    }
    return updatedDelivery;
}
async trackOrder(orderId: string){
    const delivery = await Delivery.findOne({ orderId });
    if(!delivery){
        return {
            message: 'Order not found',
            status: 'error',
            data: null,
        };
    }
    return {
        message: 'Order found',
        status: 'success',
        data: delivery,
    };
}}
export default new DeliveryService();