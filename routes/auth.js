import express from "express";
import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../db.js";
import User from "../models/user.js";
// import Patient from "../models/patient.js";

const router = express.Router();

router.get("/signin", (req, res) => {
    res.render("signin.ejs", { message: "" });
});

router.get("/signup", (req, res) => {
    res.render("signup.ejs", { message: "" });
});

router.post("/signin", async (req, res) => {
    const { email, password, role } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.render("signin.ejs", {
                message: "No record found"
            });
        }
        
        // role validation
        if (user.role !== role) {
            res.render("signin.ejs", {
                message: "Role mismatch"
            });
        }

        // set the user in session
        req.session.user = user;

        // Compare the provided password with the hashed password stored in the database
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            res.render("signin.ejs", {
                message: "Incorrect password"
            });
        } else {
            if (user.role === 'patient') {
                res.redirect("/patient/dashboard");
            } else if (user.role === 'doctor') {
                res.redirect("/doctor/dashboard");
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

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


router.get("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).send('Internal server error');
        }
        res.redirect("/signin");
    });
});

export default router;