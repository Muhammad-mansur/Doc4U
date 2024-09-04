import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';
import session from "express-session";

// route import
import doctorRoutes from './routes/doctor.js';
import patientRoutes from './routes/patient.js';
import authRoute from './routes/auth.js';

// db model import
import sequelize from "./db.js";
// import User from "./models/user.js";
// import Doctor from "./models/doctor.js";
// import Patient from "./models/patient.js";
// import Appointment from "./models/appointment.js";
// import MedicalRecord from "./models/record.js";

sequelize.sync({ force: false })
    .then(() => {
        console.log("Database and tables created successfully")
    })
    .catch(error => {
        console.err("Error syncing models with the database: ", error);
    });

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(session({
    secret: 'mansur',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

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

app.use("/", doctorRoutes);
app.use("/", patientRoutes);
app.use("/", authRoute);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});