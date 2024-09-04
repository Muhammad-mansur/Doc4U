import express from "express";
import isAuthenticated from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/doctor_dashboard", isAuthenticated, (req, res) => {
    const user = req.session.user;

    if (user && user.role === 'doctor') {
        res.render('doctor_dashboard.ejs', { user: user });
    } else {
        res.redirect("/signin");
    }
});

export default router;