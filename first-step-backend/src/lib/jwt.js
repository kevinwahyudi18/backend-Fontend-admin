const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET_KEY
const generateToken = (user) => {
     return jwt.sign({
        id: user.id,
        username: user.username,
        // Add any other user information you want to include in the token
    },
        secret, // Replace with your secret key for signing the token
        { expiresIn: "1h" } // Token expiration time
    );
};

// Function to verify JWT token
const verifyToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, secret);
        return decodedToken;
    } catch (error) {
        throw new Error("Invalid token");
    }
};

module.exports = { generateToken, verifyToken };
