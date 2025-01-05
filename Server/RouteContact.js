import express from 'express';
import Contact from './ContactModel.js'; // Adjust the path to your Contact model
const router = express.Router();

// POST route to handle contact form submissions
router.post('/', async (req, res) => {
    const { email, message } = req.body;

    console.log('Received data:', { email, message }); // Log received data for debugging

    try {
        // Create a new Contact entry and save it to the database
        const newContact = new Contact({ email, message });
        await newContact.save();
        
        console.log('Contact saved successfully:', newContact); // Log success
        res.status(201).json({ message: 'Message sent successfully', contact: newContact }); // Respond with success message
    } catch (error) {
        console.error('Error saving to database:', error); // Log database error
        res.status(500).json({ message: 'Internal server error', error: error.message }); // Respond with error message
    }
});

export default router;
