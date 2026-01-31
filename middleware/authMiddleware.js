const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ==========================================
// AUTHENTICATE - Verify JWT Token
// ==========================================
exports.authenticate = async (req, res, next) => {
    try {
        // Extract token from cookie
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required. Please login.'
            });
        }

        // Verify JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user
        const user = await User.findById(decoded.id)
            .select('_id name email role status');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found. Please login again.'
            });
        }

        // Check if user can access (not banned)
        try {
            user.canLogin();
        } catch (error) {
            return res.status(403).json({
                success: false,
                message: error.message
            });
        }

        // Attach user to request object
        req.user = user;
        next();

    } catch (err) {
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token. Please login again.'
            });
        }

        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Session expired. Please login again.'
            });
        }

        console.error('Auth Middleware Error:', err);
        return res.status(500).json({
            success: false,
            message: 'Authentication failed'
        });
    }
};

// ==========================================
// ADMIN ONLY - Restrict to Admin Role
// ==========================================
exports.isAdmin = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }

    if (!req.user.isAdmin()) {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin privileges required.'
        });
    }

    next();
};

// ==========================================
// AGENT ONLY - Restrict to Agent Role
// ==========================================
exports.isAgent = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }

    if (!req.user.isAgent()) {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Agent privileges required.'
        });
    }

    next();
};

// ==========================================
// ADMIN OR AGENT - Allow Both Roles
// ==========================================
exports.isAdminOrAgent = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }

    if (!req.user.isAdmin() && !req.user.isAgent()) {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin or Agent privileges required.'
        });
    }

    next();
};

// ==========================================
// VERIFIED AGENT ONLY - Agent with Active Status
// ==========================================
exports.isVerifiedAgent = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }

    if (!req.user.isAgent()) {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Agent privileges required.'
        });
    }

    if (req.user.status !== 'active') {
        return res.status(403).json({
            success: false,
            message: 'Your agent account is pending admin approval.'
        });
    }

    next();
};

// ==========================================
// ROLE-BASED ACCESS - Flexible Role Checker
// ==========================================
exports.hasRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: `Access denied. Required role: ${allowedRoles.join(' or ')}`
            });
        }

        next();
    };
};

// ==========================================
// OPTIONAL AUTH - Attach User if Token Exists
// ==========================================
exports.optionalAuth = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            req.user = null;
            return next();
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id)
            .select('_id name email role status');

        req.user = user || null;
        next();

    } catch (err) {
        req.user = null;
        next();
    }
};

// ==========================================
// OWNERSHIP CHECK - User Owns Resource
// ==========================================
exports.isOwner = (resourceModel, resourceIdParam = 'id') => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
            }

            const resourceId = req.params[resourceIdParam];
            const Model = require(`../models/${resourceModel}`);
            const resource = await Model.findById(resourceId);

            if (!resource) {
                return res.status(404).json({
                    success: false,
                    message: `${resourceModel} not found`
                });
            }

            // Admin can access anything
            if (req.user.isAdmin()) {
                return next();
            }

            // Check ownership
            const ownerField = resource.owner || resource.createdBy || resource.user;

            if (!ownerField || ownerField.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    success: false,
                    message: 'Access denied. You do not own this resource.'
                });
            }

            next();

        } catch (err) {
            console.error('Ownership Check Error:', err);
            return res.status(500).json({
                success: false,
                message: 'Authorization failed'
            });
        }
    };
};

// ==========================================
// ACTIVE STATUS ONLY - Block Pending/Banned Users
// ==========================================
exports.isActiveUser = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }

    if (req.user.status !== 'active') {
        return res.status(403).json({
            success: false,
            message: 'Your account is not active. Please contact support.'
        });
    }

    next();
};
