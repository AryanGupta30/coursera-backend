const User = require("../models/user");
const bcrypt = require('bcryptjs'); // Assuming bcrypt is used for hashing passwords

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
            return res.status(409).json({ message: 'Email already exists' });
        }
    
        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({ name, email, password: hashedPassword, contactNumber, gender, dob });
    
        // Save the user to the database
        await newUser.save();
    
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error('Error creating user', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "User doesn't exists" });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
