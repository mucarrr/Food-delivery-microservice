# Food Delivery Microservice

## Step by step

1. `npm i -D typescript`
2. `npx tsc --init`
3. `npm i express mongoose jsonwebtoken amqplib bcrypt zod dotenv cookie-parser helmet morgan cors express-rate-limit` (except for gateway)
4. `npm i @types/amqplib @types/bcrypt @types/cookie-parser @types/express @types/jsonwebtoken @types/mongoose @types/morgan @types/node @types/cors tsx nodemon` (except for gateway)
5. `npm i express-http-proxy dotenv express tsx` (for gateway)
6. `npm install --save-dev @types/express @types/express-http-proxy` (for gateway)

## Environment Variables

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/food_ms_user
JWT_SECRET=blabla
RABBITMQ_URI=amqp://localhost
RATE_LIMIT_WINDOW=600000
RATE_LIMIT_MAX_REQ=30
```

## NOTES

- To use import instead of require, add `"type": "module"` in `package.json`
- In gateway, no need to nodemon (static), in others "yes". tsx is enough for one time work (with `tsx index.js`)

---

## For All Services

```typescript
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

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
app.use("/", () => {});

//error handler
app.use(() => {});

//404
app.use(() => {});

app.listen(process.env.PORT, () => {
    console.log(`Restaurant is running on port ${process.env.PORT}`);
});
```

---

## For Gateway

```typescript
import dotenv from 'dotenv';
import express from 'express';
import proxy from 'express-http-proxy';

dotenv.config(); 
const app = express();

app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL!));
app.use("/api/delivery", proxy(process.env.DELIVERY_SERVICE_URL!));
app.use("/api/order", proxy(process.env.ORDER_SERVICE_URL!));
app.use("/api/restaurant", proxy(process.env.RESTAURANT_SERVICE_URL!));

app.listen(process.env.PORT, () => {
    console.log(`Gateway is running on port ${process.env.PORT}`);
});
```

---

## Error Middleware

```typescript
import type { Request, Response, NextFunction } from 'express';

//error
export const errorMiddleware = (
    err: Error,
    req: Request, 
    res: Response, 
    next: NextFunction) => {
    console.error(err.message || "Something went wrong");
    res.status(500).json({ message: err.message || "Something went wrong" });
};

//404
export const notFoundMiddleware = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "Route not found" });
};
```
