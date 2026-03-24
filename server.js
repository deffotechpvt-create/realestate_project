
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require("./routes/userroutes");
const dotenv = require('dotenv');
const { default: connectDB } = require('./config/db');
dotenv.config();
const compression = require("compression");
const { notFound, errorHandler } = require('./middleware/errorMiddleware');


const app = express();
const PORT = process.env.PORT || 5000;
connectDB();
// Security Middleware
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
}));
app.use(compression());
// Custom Mongo Sanitize
app.use(
    mongoSanitize({
        sanitizeQuery: false
    })
);
app.set("trust proxy", 1);
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
const allowedOrigins = [
    'http://localhost:8080',
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.warn('CORS blocked request', { origin });
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Auth routes
app.use('/api/auth', authRoutes);
app.use("/api/user", userRoutes);


// Basic Placeholder Route
app.get('/', (req, res) => {
    res.send('Backend API Placeholder. The frontend is currently running in independent mode.');
});
app.use(notFound);      // 404 handler
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
