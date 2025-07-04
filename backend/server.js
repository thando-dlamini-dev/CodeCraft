import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import ChatRoutes from "./routes/chat.route.js";
import RapidChatRoutes from "./routes/rapidAI.route.js";
import PdfScanRoutes from "./routes/pdfScan.route.js";
import HuggingFaceRoutes from "./routes/huggingFace.route.js";
import AuthRoutes from "./routes/auth.route.js";
import passport from 'passport';
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import { initDatabase } from './lib/db.config.js';
import { initializePassport } from "./lib/passport.config.js";
import path from "path";
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5500;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Trust proxy for DirectAdmin
app.set('trust proxy', 1);

// Security and logging middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// Debug logging middleware - ADD THIS
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    next();
});

// Only use morgan in development
if (process.env.NODE_ENV !== 'production') {
    app.use(morgan('combined'));
}

// CORS configuration
app.use(cors({
    origin: process.env.CLIENT_URL || "https://codecraft.thando.tech",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "500mb" }));
app.use(cookieParser());

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
    resave: false,
    saveUninitialized: false,
    name: 'sessionId',
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

// Initialize Passport
console.log('Initializing Passport...');
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Initialize Database
initDatabase();

app.set('trust proxy', 1);

// Health check endpoint
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// Test API routes (define specific routes BEFORE the catch-all routes)
app.get("/api/test", (req, res) => {
    res.status(200).json({ message: "Server is running", timestamp: new Date().toISOString() });
});

app.get("/api/name-test/:name", (req, res) => {
    const { name } = req.params;
    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }
    res.status(200).json({ message: `Your name is: ${name}` });
});

// Debug middleware for auth routes - ADD THIS
app.use('/api/auth', (req, res, next) => {
    console.log(`Auth route accessed: ${req.method} ${req.path}`);
    console.log('Auth middleware - proceeding to AuthRoutes');
    next();
});

// API routes - normal /api/* routes
app.use("/api/chat", ChatRoutes);
app.use("/api/rapid-chat", RapidChatRoutes);
app.use("/api/scan-pdf", PdfScanRoutes);
app.use("/api/huggingface", HuggingFaceRoutes);
app.use("/api/auth", AuthRoutes); 

// API 404 fallback (MUST be last)
app.use('/api', (req, res) => {
    console.log(`API 404: ${req.method} ${req.originalUrl}`);
    res.status(404).json({
        error: "API endpoint not found",
        path: req.originalUrl,
        method: req.method
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    console.error('Stack trace:', err.stack);

    const errorMessage = process.env.NODE_ENV === 'production'
        ? 'Internal server error'
        : err.message;

    res.status(err.status || 500).json({
        error: errorMessage,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

// Start server - bind to localhost for DirectAdmin
app.listen(PORT, 'localhost', () => {
    console.log(`🚀 Server running on localhost:${PORT}`);
    console.log(`📅 Server started at: ${new Date().toISOString()}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
	console.log(`    AI Model: ${process.env.HF_FALLBACK_MODEL || 'None'}`);
    console.log(`🔑 Session secret set: ${!!process.env.SESSION_SECRET}`);
    console.log(`🌐 Client URL: ${process.env.CLIENT_URL || "https://codecraft.thando.tech"}`);
});