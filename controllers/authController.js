const User = require('../models/User');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/token');

// Helper: set cookie
function setAuthCookie(res, token) {
    res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
}

exports.register = async (req, res) => {
    try {
        const { name, email, password, accountType } = req.body;
        const normalizedEmail = email.trim().toLowerCase();

        if (!name || !email || !password || !accountType) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        const hash = await bcrypt.hash(password, 10);

        // ---------- ROLE + STATUS DECISION ----------
        let role = "user";
        let status = "active";

        if (accountType === "agent") {
            status = "pending_verification"; // admin approval needed
        }
        // buyer OR anything else => normal user
        // -------------------------------------------
        await User.create({
            name,
            email: normalizedEmail,
            password: hash,
            role,
            status
        });

        res.status(201).json({
            message: "Registration successful. Please login."
        });


    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: "Email already registered" });
        }
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Missing email or password' });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User
            .findOne({ email: normalizedEmail })
            .select('_id name email role status password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (user.status === 'banned') {
            return res.status(403).json({ message: 'User is banned' });
        }

        const token = generateToken({
            id: user._id,
            role: user.role,
            status: user.status
        });

        setAuthCookie(res, token);

        res.json({
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    });
    res.json({ message: 'Logged out' });
};

// One-time admin setup
exports.setupAdmin = async (req, res) => {
    try {
        const { name, email, password, phone, adminKey } = req.body;
        if (!name || !email || !password || !adminKey) return res.status(400).json({ message: 'Missing required fields' });
        if (adminKey !== process.env.ADMIN_SETUP_KEY) return res.status(403).json({ message: 'Invalid admin setup key' });
        const adminExists = await User.findOne({ role: 'admin' });
        if (adminExists) return res.status(409).json({ message: 'Admin already exists' });
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            name,
            email: email.toLowerCase(),
            password: hash,
            phone,
            role: 'admin',
            status: 'active'
        });
        res.status(201).json({
            message: "Admin created successfully. Please login."
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });

    }
};
