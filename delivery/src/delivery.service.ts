// business logic 
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
}
export default new DeliveryService();