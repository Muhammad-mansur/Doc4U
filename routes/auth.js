// Package imports
import express from "express";
import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import sequelize from "../db.js";

// Model imports
import User from "../models/user.js";
// import Patient from "../models/patient.js";

const router = express.Router();

// Secret key for signing JWTs
const JWT_SECRET = process.env.JWT_SECRET;

// Render signin page
router.get("/signin", (req, res) => {
    res.render("signin.ejs", { message: "" });
});

// Render signup page
router.get("/signup", (req, res) => {
    res.render("signup.ejs", { message: "" });
});

// Signin
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        // Send token in cookie
        res.cookie('authToken', token, { httpOnly: true });
        // res.redirect(user.role === 'patient' ? '/patient/dashboard' : '/doctor/dashboard');
        // return res.status(200).json({ message: "Login successful" });
        
         // Redirect based on user role
         if (user.role === 'doctor') {
            return res.redirect('/doctor/dashboard'); // Adjust the route as per your dashboard
        } else if (user.role === 'patient') {
            return res.redirect('/patient/dashboard'); // Adjust the route as per your dashboard
        } else {
            return res.status(403).json({ message: "Access denied" });
        }

    } catch (error) {
        console.error("Error during signin:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


// Signup
router.post("/signup", async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const checkResult = await sequelize.query('SELECT * FROM "Users" WHERE email = :email',
            {
                type: Sequelize.QueryTypes.SELECT,
                replacements: { email },
            }
        )
        if (checkResult.length > 0) {
            res.render("signup.ejs", {
                message: "Email already exists"
            });
        }
        else {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await sequelize.query('INSERT INTO "Users" (name, email, password, role) VALUES (:name, :email, :password, :role) RETURNING *',
                {
                    type: Sequelize.QueryTypes.INSERT,
                    replacements: { name, email, password: hashedPassword, role },
                }
            );
            res.render("signup-success.ejs");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error"});
    }
});


// Logout
router.get('/logout', (req, res) => {
    res.clearCookie('authToken');
    res.redirect("/signin");
    // return res.status(200).json({ message: "Logout successful" });
});

export default router;