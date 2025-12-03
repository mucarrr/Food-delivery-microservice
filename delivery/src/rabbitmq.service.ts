import amqp, { type Channel, type ChannelModel } from 'amqplib';
import type { IOrder, IUser } from './types/index.js';
import { Courier, Delivery } from './delivery.model.js';

class RabbitMQService {
    private connection: ChannelModel | null = null;
    private channel: Channel | null = null;
    private readonly exchangeName = "food_delivery_exchange";
    private readonly orderQueue = "order_queue";
    private readonly deliveryQueue = "delivery_queue";
    private readonly courierQueue = "courier_queue";

    // RabbitMQ connection
    // notes: 
    // 1. Exchange type --> topic --> according to routing key, the message will be delivered to the corresponding queue
    async initialize(): Promise<void> {
        try{
            // Connect to RabbitMQ
            const url = process.env.RABBITMQ_URI as string;
            this.connection = await amqp.connect(url);
             // Create a channel
            // Create a channel and assign it to this.channel
            this.channel = await this.connection.createChannel();

            if (!this.channel) {
                throw new Error("Failed to create a RabbitMQ channel.");
            }

            // Create an exchange
            await this.channel.assertExchange(this.exchangeName, 'topic', { durable: true }); //2. durable:true --> the exchange will not be deleted when the server restarts
            // Create queues
            await this.channel.assertQueue(this.orderQueue, { durable: true });
            await this.channel.assertQueue(this.deliveryQueue, { durable: true });
            await this.channel.assertQueue(this.courierQueue, { durable: true });
            // Bind queues to exchange
            await this.channel.bindQueue(this.orderQueue, this.exchangeName, 'order.*');
            await this.channel.bindQueue(this.deliveryQueue, this.exchangeName, 'order.created');
            await this.channel.bindQueue(this.courierQueue, this.exchangeName, 'courier.*');

            await this.consumeMessages();
            await this.consumeCourierMessages();
            
        
        }catch(error){
            console.error('Failed to connect to RabbitMQ:', error);
            throw error;
        }

}
async publishMessage(routingKey: string, message: unknown){
    try{
        if(!this.channel){
            throw new Error("RabbitMQ channel is not initialized");
        }
        const content = Buffer.from(JSON.stringify(message));
        this.channel.publish(this.exchangeName, routingKey, content, { persistent: true });
        console.log(`Message published to ${routingKey} with content: ${content.toString()}`);
    }catch(error){
        console.error('Failed to publish message:', error);
        throw error;
    }
}
async consumeMessages(){
    if(!this.channel){
        throw new Error("RabbitMQ channel is not initialized");
    }
    await this.channel.consume(this.deliveryQueue, async (message) => {
        if(!message){
            return;
        }
        try{
            const content = JSON.parse(message.content.toString()) as IOrder;

            if (content.status === 'pending'){
                await Delivery.create({
                    orderId: content._id,
                    status: 'pending',

                })
                const courier = await Courier.findOne({ status: 'available' }).sort({ updatedAt: -1 });
                if (courier) {
                await Delivery.findOneAndUpdate( courier._id, 
                    { status: 'busy' }
                );
                await Delivery.findOneAndUpdate( { orderId: content._id }, { status: 'confirmed', courierId: courier._id, acceptedAt: new Date() } );
            }
            }
            if (content.status === 'ready_for_delivery'){
                await Delivery.findOneAndUpdate( { orderId: content._id }, { status: 'ready_for_delivery' } );
            }
            if (content.status === 'on_the_way'){
                await Delivery.findOneAndUpdate( { orderId: content._id }, { status: 'on_the_way' } );
            }
            if (content.status === 'delivered'){
                await Delivery.findOneAndUpdate( { orderId: content._id }, { status: 'delivered' } );
            }
            if (content.status === 'cancelled'){
                await Delivery.findOneAndUpdate( { orderId: content._id }, { status: 'cancelled' } );
            }
            

        console.log(`Message received from ${this.deliveryQueue} with content:`, content);
        this.channel?.ack(message); //ack --> acknowledge the message --> the message will be deleted from the queue
        }catch(error){
            console.error('Failed to parse message:', error);
            this.channel?.nack(message, false, true); //nack --> negative acknowledge --> the message will be put back in the queue
        }
    });
;
}
async consumeCourierMessages(){
    if(!this.channel){
        throw new Error("RabbitMQ channel is not initialized");
    }
    await this.channel.consume(this.courierQueue, async (message) => {
        if(!message){
            return;
        }
        try{
            const content = JSON.parse(message.content.toString()) as IUser;
            const courier = await Courier.create({ ...content, status: 'available' });
            console.log(`Courier created:`, courier);
            this.channel?.ack(message); //ack --> acknowledge the message --> the message will be deleted from the queue
        }catch(error){
            console.error('Failed to parse message:', error);
            this.channel?.nack(message, false, true); //nack --> negative acknowledge --> the message will be put back in the queue
        }
    });
}
}
export default new RabbitMQService();