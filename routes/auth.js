import express from "express";
import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";
import sequelize from "../db.js";

const router = express.Router();

router.get("/signin", (req, res) => {
    res.render("signin.ejs");
});

router.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

router.post("/signup", async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const checkResult = await sequelize.query('SELECT * FROM "Users" WHERE email = $1',
            {
                type: Sequelize.QueryTypes.SELECT,
                replacements: [email],
            }
        )
        if (checkResult.length > 0) {
            res.status(400).send({ message: "Email already exists"});
        }
        else {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            const [result] = await sequelize.query('INSERT INTO "Users" (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
                {
                    type: Sequelize.QueryTypes.INSERT,
                    replacements: [name, email, hashedPassword, role],
                }
            );
            res.redirect("/signin");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error"});
    }
});

export default router;