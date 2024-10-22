// Import
const { request, response } = require('express');
const db = require('../config/db');
const bcrypt = require('bcryptjs');

// User registration function
exports.registerUser = async (request, response) => {
    // Fetch data
    const { name, email, password } = request.body;
    
    try {
        // Check if user exists
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length > 0) {
            return response.status(400).json({ message: 'User already exists!' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert record into the db table
        await db.execute('INSERT INTO users (name, email, password) VALUES (?,?,?)', [
            name,
            email,
            hashedPassword
        ]);

        // Success response
        response.status(201).json({ message: 'User registered successfully!' });
    
    } catch (error) {
        // Log full error to the console
        console.error("Registration Error:", error);
        
        // Send error response
        response.status(500).json({
            message: 'An error occurred while registering the user.',
            error: error.message // Include only the message in the response
        });
    }
};

// User login function
exports.loginUser = async (request, response) => {
    const { email, password } = request.body;

    try {
        // Check if user exists
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) {
            return response.status(400).json({ message: 'User not found! Please register.' });
        }

        const user = rows[0];

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(400).json({ message: 'Invalid credentials!' });
        }

        // Success response
        response.status(200).json({
            message: 'Login successful!',
            name: user.name,
            email: user.email
        });

    } catch (error) {
        // Log full error to the console
        console.error("Login Error:", error);

        // Send error response
        response.status(500).json({
            message: 'An error occurred during login.',
            error: error.message // Include only the message in the response
        });
    }
};
