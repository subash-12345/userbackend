const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect( process.env.MONGO_URL )
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

// Mongoose Schema
const userSchema = new mongoose.Schema({
  count: Number
});

const User = mongoose.model('User', userSchema);

// POST route to save form data
app.post('/api/articles/incrementLikeCount', async (req, res) => {
  try {
    const { count } = req.body;
    const newUser = new User({ count });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Failed to save user' });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
