import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Set up EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("patient_dashboard.ejs", { userName: 'Mansur', userType: 'Doctor'});
});

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});