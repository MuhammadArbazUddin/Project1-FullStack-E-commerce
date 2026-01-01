import 'dotenv/config';
import mongoose from 'mongoose';

let retryCount = 0;
const MAX_RETRIES = 3;

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");

    const options = {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
    };

    if (!mongoose.connection._hasListeners) {
      mongoose.connection.on('connected', () => {
        console.log('MongoDB connected successfully');
        retryCount = 0;
      });

      mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
      });

      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
      });

      mongoose.connection._hasListeners = true;
    }

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in .env");
    }

    const uri = new URL(process.env.MONGODB_URI);
    uri.pathname = "/e-commerce"; 

    await mongoose.connect(uri.toString(), options);
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);

    if (retryCount < MAX_RETRIES) {
      retryCount++;
      console.log(`Retrying connection (${retryCount}/${MAX_RETRIES}) in 5 seconds...`);
      setTimeout(connectDB, 5000);
    } else {
      console.error('Max retries reached. Exiting...');
      process.exit(1);
    }
  }
};

export default connectDB;
