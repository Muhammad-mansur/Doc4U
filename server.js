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

sequelize.sync({ force: false })
    .then(() => {
        console.log("Database and tables created successfully")
    })
    .catch(error => {
        console.err("Error syncing models with the database: ", error);
    });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(session({
    secret: 'mansur',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/doctor', doctorRoutes);  // Route prefix for doctor
app.use('/patient', patientRoutes);  // Route prefix for patient
app.use("/", authRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
