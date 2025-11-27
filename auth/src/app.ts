import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { notFoundMiddleware } from './auth.middleware.js';
import { errorMiddleware } from './auth.middleware.js';
import authRoutes from './auth.routes.js';
dotenv.config(); 
const app = express();

mongoose.connect(process.env.MONGODB_URI!).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW as string),
max: parseInt(process.env.RATE_LIMIT_MAX_REQ as string),
message: 'Too many requests, please try again later.'
});
//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(helmet());
app.use(morgan('dev'));
app.use(limiter);

//routes
app.use("/", authRoutes);
//error handler
app.use(errorMiddleware);
//404
app.use(notFoundMiddleware);

app.listen(process.env.PORT, () => {
    console.log(`Auth is running on port ${process.env.PORT}`);
});