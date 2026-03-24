const User = require('../models/User');
const { generateToken } = require('../utils/token');
const { asyncHandler, AppError } = require('../middleware/errorMiddleware');

// ==========================================
// HELPER: Set HTTP-Only Cookie
// ==========================================
function setAuthCookie(res, token) {
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
}

// ==========================================
// REGISTER USER
// ==========================================
exports.register = asyncHandler(async (req, res) => {
    const { name, email, password, accountType } = req.body;

    // Validation
    if (!name || !email || !password || !accountType) {
        throw new AppError('All fields are required', 400);
    }

    // Determine role and status
    let role = 'user';
    let status = 'active';

    if (accountType === 'agent') {
        role = 'agent';
        status = 'pending_verification';
    }

    // Create user (password auto-hashed by model pre-save hook)
    await User.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password, // Auto-hashed by User model
        role,
        status
    });

    res.status(201).json({
        success: true,
        message: accountType === 'agent'
            ? 'Registration successful. Your agent account is pending admin approval.'
            : 'Registration successful. Please login.'
    });
});

// ==========================================
// LOGIN USER
// ==========================================
exports.login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
        throw new AppError('Email and password are required', 400);
    }

    // Find user with password field (using static method)
    const user = await User.findByEmail(email.trim());

    if (!user) {
        throw new AppError('Invalid email or password', 401);
    }

    // Check if user can login (not banned/pending)
    user.canLogin();

    // Compare password (using instance method - uses bcrypt internally)
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        throw new AppError('Invalid email or password', 401);
    }

    // Update last login
    await user.updateLastLogin();

    // Generate JWT token
    const token = generateToken({
        id: user._id,
        role: user.role,
        status: user.status
    });

    // Set HTTP-only cookie
    setAuthCookie(res, token);

    // Return safe user data (password excluded by toJSON)
    const response = {
        success: true,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            status: user.status
        }
    };

    // Add message for pending users
    if (user.status === 'pending_verification') {
        response.message = 'Your agent account is pending admin approval. You can manage your profile but cannot access CRM features yet.';
    }

    res.json(response);
});

// ==========================================
// LOGOUT USER
// ==========================================
exports.logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production'
    });

    res.json({
        success: true,
        message: 'Logged out successfully'
    });
};

// ==========================================
// SETUP ADMIN (One-time only)
// ==========================================
exports.setupAdmin = asyncHandler(async (req, res) => {
    const { name, email, password, phone, adminKey } = req.body;

    // Validation
    if (!name || !email || !password || !adminKey) {
        throw new AppError('All fields are required', 400);
    }

    // Verify admin setup key
    if (adminKey !== process.env.ADMIN_SETUP_KEY) {
        throw new AppError('Invalid admin setup key', 403);
    }

    // Check if admin already exists
    const adminExists = await User.findOne({ role: 'admin' });

    if (adminExists) {
        throw new AppError('Admin already exists. This endpoint is disabled.', 409);
    }

    // Create admin (password auto-hashed by model)
    await User.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password, // Auto-hashed by User model
        phone: phone?.trim(),
        role: 'admin',
        status: 'active',
        isVerified: true
    });

    res.status(201).json({
        success: true,
        message: 'Admin account created successfully. Please login.'
    });
});