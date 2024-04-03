// server.js (Node.js backend)
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;

// Allow requests from localhost:3000
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// MongoDB Atlas connection string
const MONGODB_URI = 'mongodb+srv://30aryang:araah@cluster0.1mtcf7d.mongodb.net/test?retryWrites=true&w=majority';

// Connect to MongoDB Atlas
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Define a schema for user model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  contact: String,
  gender: String,
  dateOfBirth: Date
});

// Create a model based on the schema
const User = mongoose.model('User', userSchema);

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to handle signup
app.post('/login', async (req, res) => {
  try {
    // Extract user details from request body
    const { username, email, password, contact, gender, dateOfBirth } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create a new user instance
    const newUser = new User({ username, email, password, contact, gender, dateOfBirth });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error creating user', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
