import 'dotenv/config';
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const options = {dbName: 'e-commerce'};

    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
  }
};

export default connectDB;