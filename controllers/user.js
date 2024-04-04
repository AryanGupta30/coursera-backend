const User = require("../models/user");

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.createUser = async (req, res) => {
    try {
        // Extract user details from request body
        const { name, email, password, contactNumber, gender, dob } = req.body;
    
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
        }
    
        // Create a new user instance
        const newUser = new User({ name, email, password, contactNumber, gender, dob });
    
        // Save the user to the database
        await newUser.save();
    
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error('Error creating user', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}