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