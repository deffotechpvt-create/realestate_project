const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
    validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: 'Please provide a valid email address'
    }
  },
  phone: {
    type: String,
    required: false,
    sparse: true,
    trim: true,
    validate: {
      validator: function (v) {
        if (!v) return true;
        return /^[+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(v);
      },
      message: 'Please provide a valid phone number'
    }
  },
  password: {
    type: String,
    required: function () { return !this.googleId; },
    minlength: [6, 'Password must be at least 6 characters'],
    select: false
  },
  googleId: {
    type: String,
    sparse: true,
    index: true
  },
  role: {
    type: String,
    enum: {
      values: ['admin', 'agent', 'user'],
      message: '{VALUE} is not a valid role'
    },
    default: 'user',
    index: true
  },
  status: {
    type: String,
    enum: {
      values: ['active', 'pending_verification', 'banned'],
      message: '{VALUE} is not a valid status'
    },
    default: 'active',
    index: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium'],
      default: 'free'
    },
    expiryDate: Date,
    contactsUnlocked: {
      type: Number,
      default: 0,
      min: 0
    }
  },
  shortlistedProperties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }],

  bannedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  bannedAt: {
    type: Date,
    default: null
  },
  banReason: {
    type: String,
    maxlength: 500
  },

  refreshToken: {
    type: String,
    select: false
  },

  lastLogin: {
    type: Date
  },

  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  }
}, {
  timestamps: true
});

// ==========================================
// INDEXES
// ==========================================
userSchema.index({ role: 1, status: 1 });
userSchema.index({ email: 1, status: 1 });

// ==========================================
// PRE-SAVE MIDDLEWARE: Hash password with bcrypt
// ==========================================
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// ==========================================
// INSTANCE METHODS
// ==========================================

// Compare password using bcrypt
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

// Check if user can login
userSchema.methods.canLogin = function () {
  if (this.status === 'banned') {
    throw new Error(`Account banned: ${this.banReason || 'Policy violation'}`);
  }
  return true;
};

// Ban user
userSchema.methods.ban = function (adminId, reason) {
  this.status = 'banned';
  this.bannedBy = adminId;
  this.bannedAt = new Date();
  this.banReason = reason || 'Policy violation';
  this.refreshToken = null;
  return this.save();
};

// Unban user
userSchema.methods.unban = function () {
  this.status = 'active';
  this.bannedBy = null;
  this.bannedAt = null;
  this.banReason = null;
  return this.save();
};

// Add property to shortlist
userSchema.methods.addToShortlist = async function (propertyId) {
  if (!this.shortlistedProperties.includes(propertyId)) {
    this.shortlistedProperties.push(propertyId);
    await this.save();
  }
  return this;
};

// Remove from shortlist
userSchema.methods.removeFromShortlist = async function (propertyId) {
  this.shortlistedProperties = this.shortlistedProperties.filter(
    id => id.toString() !== propertyId.toString()
  );
  await this.save();
  return this;
};

// Check if user is admin
userSchema.methods.isAdmin = function () {
  return this.role === 'admin';
};

// Check if user is agent
userSchema.methods.isAgent = function () {
  return this.role === 'agent';
};

// Update last login
userSchema.methods.updateLastLogin = function () {
  this.lastLogin = new Date();
  return this.save();
};

// Safe JSON output
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  delete obj.refreshToken;
  delete obj.__v;
  return obj;
};

// ==========================================
// STATIC METHODS
// ==========================================

// Get all active agents
userSchema.statics.getActiveAgents = function () {
  return this.find({
    role: 'agent',
    status: 'active'
  }).select('name email phone').sort({ name: 1 });
};

// Get users by role
userSchema.statics.getUsersByRole = function (role, status = 'active') {
  const query = { role };
  if (status) query.status = status;

  return this.find(query)
    .select('-password -refreshToken')
    .sort({ createdAt: -1 });
};

// Find user by email (for login)
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email.toLowerCase() })
    .select('+password +refreshToken');
};

// Find user by Google ID
userSchema.statics.findByGoogleId = function (googleId) {
  return this.findOne({ googleId });
};

// Get banned users
userSchema.statics.getBannedUsers = function () {
  return this.find({ status: 'banned' })
    .populate('bannedBy', 'name email')
    .select('-password -refreshToken')
    .sort({ bannedAt: -1 });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
