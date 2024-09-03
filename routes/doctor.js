import express from "express";

const router = express.Router();

router.get("/doctor_dashboard", (req, res) => {
    res.render("doctor_dashboard.ejs", {
        userName: 'Mansur', userType: 'doctor'});
});

export default router;