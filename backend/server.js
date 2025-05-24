import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import ChatRoutes from "./routes/chat.route.js";
import RapidChatRoutes from "./routes/rapidAI.route.js"
import PdfScanRoutes from "./routes/pdfScan.route.js"
import HuggingFaceRoutes from "./routes/huggingFace.route.js"
import AuthRoutes from "./routes/auth.route.js";
import passport from 'passport';
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import "../backend/lib/passport.config.js";
import { initDatabase } from './lib/db.config.js';
import { initializePassport } from "../backend/lib/passport.config.js";
import { ensureAuthenticated } from './middleware/authMiddleware.js';
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5500;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Middleware
app.use(helmet());
app.use(morgan('dev'));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({limit: "500mb"}));
app.use(cookieParser());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
}));

//Initialize Passport
initializePassport();
app.use(passport.initialize());

initDatabase();

//test routes
app.get("/api/server-test", (req, res) => {
    res.status(200).send("Server is running");
})
app.get("/api/name-test/:name", (req, res) => {
    const { name } = req.params; 
    if(!name){
        return res.status(400).send("Name is required");
    }
    res.status(200).send(`Your name is: ${name}`);
})


//api routes
app.use("/api/chat", ChatRoutes);
app.use("/api/rapid-chat", RapidChatRoutes);
app.use("/api/scan-pdf", PdfScanRoutes);
app.use("/api/huggingface", HuggingFaceRoutes);
app.use("/api/auth", AuthRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
    console.log(`Server started at: ${new Date}`);
})