const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['apartment', 'house', 'villa', 'plot', 'commercial'],
    required: true
  },
  status: {
    type: String,
    enum: ['rent', 'sale'],
    required: true
  },
  location: {
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      fullAddress: String
    },
    // GeoJSON format for geospatial queries
    coordinates: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true
      }
    }
  },
  specifications: {
    bhk: {
      type: Number,
      required: true
    },
    bathrooms: Number,
    balconies: Number,
    totalFloors: Number,
    floorNumber: Number,
    superBuiltUpArea: Number, // in sq ft
    carpetArea: Number, // in sq ft
    furnishing: {
      type: String,
      enum: ['unfurnished', 'semi-furnished', 'fully-furnished'],
      default: 'unfurnished'
    },
    parking: {
      type: String,
      enum: ['none', 'bike', 'car', 'both'],
      default: 'none'
    }
  },
  amenities: [{
    type: String
  }],
  media: {
    images: [{
      url: String,
      publicId: String // for Cloudinary
    }],
    videos: [{
      url: String,
      publicId: String
    }]
  },
  price: {
    amount: {
      type: Number,
      required: true
    },
    negotiable: {
      type: Boolean,
      default: false
    },
    maintenance: Number,
    securityDeposit: Number // for rent
  },
  verification: {
    isVerified: {
      type: Boolean,
      default: false
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    verificationDate: Date
  },
  availability: {
    availableFrom: {
      type: Date,
      default: Date.now
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create 2dsphere index for geospatial queries
propertySchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('Property', propertySchema);
