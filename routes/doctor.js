import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Doctor dashboard route
router.get("/dashboard", authMiddleware, (req, res) => {
    res.render('layout', { user: req.user, page: 'doctor_dashboard' });
});

// Doctor appointments route
router.get("/appointments", authMiddleware, async (req, res) => {
    try {
        const appointments = []; // Fetch upcoming appointments from database
        const pastAppointments = []; // Fetch past appointments from database

        res.render('layout', { user: req.user, page: 'doctor_appointments', appointments, pastAppointments });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        res.status(500).send("Internal Server Error");
    }
});

// Doctor account route
router.get("/account", authMiddleware, (req, res) => {
    res.render('layout', { user: req.user, page: 'doctor_account' });
});

export default router;



// import express from "express";
// import isAuthenticated from "../middlewares/authMiddleware.js";

// const router = express.Router();

// // Doctor dashboard route
// router.get("/dashboard", isAuthenticated, (req, res) => {  // Ensure this path matches with the link in layout.ejs
//     res.render('layout', { user: req.session.user, page: 'doctor_dashboard' });
// });

// // Doctor appointments route
// router.get("/appointments", isAuthenticated, async (req, res) => {  // Use async to handle database calls
//     try {
//         const appointments = []; // Fetch upcoming appointments from database
//         const pastAppointments = []; // Fetch past appointments from database
        
//         // Replace with actual database calls
//         // const appointments = await Appointment.find({ where: { doctorId: req.session.user.id, status: 'upcoming' } });
//         // const pastAppointments = await Appointment.find({ where: { doctorId: req.session.user.id, status: 'completed' } });
        
//         res.render('layout', { user: req.session.user, page: 'doctor_appointments', appointments, pastAppointments });
//     } catch (error) {
//         console.error("Error fetching appointments:", error);
//         res.status(500).send("Internal Server Error");
//     }
// });


// // Doctor account route
// router.get("/account", isAuthenticated, (req, res) => {  // Ensure this path matches with the link in layout.ejs
//     res.render('layout', { user: req.session.user, page: 'doctor_account' });
// });

// export default router;