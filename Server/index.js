import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './RouteLog.js';
import contactRoutes from './RouteContact.js'; // Import the contact routes

dotenv.config();

const app = express();
const port = 4000;

// Middleware setup
app.use(cors({
    origin: 'http://127.0.0.1:5500', // Allow requests from your frontend
    methods: ['GET', 'POST'], // Allow only the necessary HTTP methods
}));
app.use(express.json());

// Use the routes for both user and contact form submissions
app.use('/api/user', userRoutes);
app.use('/api/contact', contactRoutes); // New route for contact form

// MongoDB connection
const dbURI = process.env.DB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
    }
};

connectDB();

app.use('/api/contact', contactRoutes);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
