// import jwt from 'jsonwebtoken';

// const isAuthenticated = (req, res, next) => {
//     const token = req.headers['authorization']?.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: "Access denied. No token provided." });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Use your secret key
//         req.user = decoded;  // Attach user info to the request object
//         next();
//     } catch (error) {
//         return res.status(400).json({ message: "Invalid token." });
//     }
// };

// export default isAuthenticated;


import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.cookies.authToken; // Get the token from the cookie

    if (!token) {
        return res.status(403).json({ message: "Access denied. No token provided." });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Store the user data in the request object
        next(); // Move to the next middleware/route handler
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default authMiddleware;
