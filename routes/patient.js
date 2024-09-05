import express from "express";
import isAuthenticated from "../middlewares/authMiddleware.js";

const router = express.Router();

// Patient dashboard route
router.get("/dashboard", isAuthenticated, (req, res) => {  // Ensure this path matches with the link in layout.ejs
    res.render('layout', { user: req.session.user, page: 'patient_dashboard' });
});

router.get("/appointments", isAuthenticated, async (req, res) => {  // Use async to handle database calls
    try {
        const appointments = []; // Fetch upcoming appointments from database
        const pastAppointments = []; // Fetch past appointments from database
        
        // Replace with actual database calls
        // const appointments = await Appointment.find({ where: { doctorId: req.session.user.id, status: 'upcoming' } });
        // const pastAppointments = await Appointment.find({ where: { doctorId: req.session.user.id, status: 'completed' } });
        
        res.render('layout', { user: req.session.user, page: 'patient_appointments', appointments, pastAppointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Patient account route
router.get("/account", isAuthenticated, (req, res) => {  // Ensure this path matches with the link in layout.ejs
    res.render('layout', { user: req.session.user, page: 'patient_account' });
});

export default router;