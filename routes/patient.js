import express from "express";

const router = express.Router();

router.get("/patient_dashboard", (req, res) => {
    res.render("patient_dashboard.ejs", {
        userName: 'Muhammad Mansur', userType: 'patient'});
});

export default router;
