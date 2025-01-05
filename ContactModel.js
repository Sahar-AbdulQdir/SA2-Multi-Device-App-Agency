import mongoose from 'mongoose';

// Define the schema for the contact form submission
const contactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Timestamps will help track when the message was submitted

// Export the model so it can be used in other files
export default mongoose.model('ContactCollection', contactSchema);
