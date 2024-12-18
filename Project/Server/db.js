const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Connect to the MongoDB database
        const conn = await mongoose.connect('mongodb+srv://saharkasir27:Ahoody19!@cluster1.1957l.mongodb.net/testdb?retryWrites=true&w=majority&appName=Cluster1');
        // Log success message
        console.log(`MongoDB Connected: ${conn.connection.host}...`);
    } catch (error) {
        // Log error message and exit process with failure
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit the process with a non-zero status
    }
};

// Export the connectDB function for use in other files
module.exports = connectDB;
