import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';

import sequelize from "./db.js";

// model import
import User from "./models/user.js";
import Doctor from "./models/doctor.js";
import Patient from "./models/patient.js";
import Appointment from "./models/appointment.js";
import record from "./models/record.js";

sequelize.sync({ force: false })
    .then(() => {
        console.log("Database and tables created successfully")
    })
    .catch(error => {
        console.err("Error syncing models with the database: ", error);
    });

// route import
import patientRoutes from './routes/patient.js';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

app.get("/doctor_dashboard", (req, res) => {
    res.render("doctor_dashboard.ejs", {
        userName: 'Mansur', userType: 'doctor'});
});

app.use("/patient_dashboard", patientRoutes);

app.get("/signin", (req, res) => {
    res.render("signin.ejs");
});

app.get("/signup", (req, res) => {
    res.render("signup.ejs");
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});