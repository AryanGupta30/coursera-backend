// server.js (Node.js backend)
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const User = require('./models/user');


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


// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
