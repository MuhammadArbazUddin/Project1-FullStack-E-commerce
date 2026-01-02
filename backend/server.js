import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;
connectDB();
connectCloudinary();

// Middleware
app.use(express.json());
app.use(cors());

// Api Endpoints
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter) 

// Routes
app.get('/', (req, res) => {
    res.send(`Welcome to ecommerce API`);
    res.json({ message: 'Welcome to ecommerce API' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});