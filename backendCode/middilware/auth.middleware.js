const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        // Verify the JWT token using your secret key (e.g., "masai")
        jwt.verify(token, "masai", (err, decoded) => {
            if (decoded) {
                // If the token is valid, attach user information to the request body
                req.body.userId = decoded.userId;
                req.body.username = decoded.username;
                next(); // Proceed to the next middleware or route
            } else {
                res.status(401).json({ error: "Token verification failed" });
            }
        });
    } else {
        res.status(401).json({ message: "Please login" });
    }
};

module.exports = {
    auth
};
