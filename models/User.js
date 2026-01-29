const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: function() { return !this.googleId; } // Required if not using OAuth
  },
  googleId: {
    type: String
  },
  role: {
    type: String,
    enum: ['tenant', 'buyer', 'owner', 'admin'],
    default: 'tenant'
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
      default: 0
    }
  },
  shortlistedProperties: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Property'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);
