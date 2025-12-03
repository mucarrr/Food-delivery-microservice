
import User from './auth.model.js';
import type { RegisterInput, LoginInput } from './auth.dto.js';
import type { IUser } from './types/index.js';
import  jwt  from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import RabbitMQService from './rabbitmq.service.js';
class AuthService {
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
    private generateToken(user: IUser): string {
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET as string, { expiresIn: '24h' });
        return token;
    }
    async register(data: RegisterInput) {
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await User.create({ ...data, password: hashedPassword });
        if(user.role === 'courier'){
            await RabbitMQService.publishMessage('courier.registered', user);
        }
        const token = this.generateToken(user);
        return { user, token };
    }

    async login(data: LoginInput) {
        const user = await User.findOne({ email: data.email });
        if (!user) {
            throw new Error('Invalid email or password');
        } 
        const isPasswordValid = await bcrypt.compare(data.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }
        user.lastLogin = new Date();
        await user.save();
        const token = this.generateToken(user);
        return { user, token };
    }
}
export default new AuthService();