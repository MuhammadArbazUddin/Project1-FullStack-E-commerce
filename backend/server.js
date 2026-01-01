import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send(`Welcome to ecommerce API`);
    res.json({ message: 'Welcome to ecommerce API' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});