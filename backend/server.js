const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/health_app', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
});

const User = mongoose.model('User', userSchema);

// Create User Route
app.post('/api/users/create', async (req, res) => {
    console.log('Received body:', req.body); // Log the request body

    try {
        const { username, password, name, age, height, weight } = req.body;

        // Basic validation
        if (!username || !password || !name || !age || !height || !weight) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newUser = new User({
            username,
            password,
            name,
            age,
            height,
            weight,
        });

        await newUser.save();
        res.status(201).json(newUser); // Return the created user
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
// this is test comment
