const bcrypt = require('bcrypt');
const User = require('../model/userModel');
exports.createUser = async (req, res) => {
    const { username, password } = req.body;

    // Validate password
    if (!validatePassword(password)) {
        return res.status(400).json({ error: 'Invalid password format.eg.Siddhesh123' });
    } 

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: 'Username already exists' });
        }

        // Hash the password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new User({
            username,
            password: hashedPassword,
        });

        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while registering the user' });
    }
}

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if the user exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Validate the password
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Successful login 
        res.json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while logging in' });
    }
}

// Password validation function
function validatePassword(password) {
    // At least 6 characters, at least one uppercase letter, and at least one lowercase letter
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(password);
}