import express from "express";
import isAuthenticated from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/patient_dashboard", isAuthenticated, (req, res) => {
    const user = req.session.user;

    if (user && user.role === 'patient') {
        res.render('patient_dashboard.ejs', { user: user });
    } else {
        res.redirect("/signin");
    }
});

export default router;