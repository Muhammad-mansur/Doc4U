import express from "express"; 
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Route imports
import doctorRoutes from './routes/doctor.js';
import patientRoutes from './routes/patient.js';
import authRoute from './routes/auth.js';

// Import database instance
import sequelize from "./db.js";

dotenv.config();

// Initialize Express app
const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON requests
app.use(cookieParser()); // Middleware to parse cookies

// Sync database
sequelize.sync({ force: false })
    .then(() => {
        console.log("Database and tables created successfully");
    })
    .catch(error => {
        console.error("Error syncing models with the database: ", error);
    });

// Path setup for views and public files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware and route setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Use routes
app.use('/doctor', doctorRoutes);
app.use('/patient', patientRoutes);
app.use("/", authRoute);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
