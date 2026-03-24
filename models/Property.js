const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    required: true,
    maxlength: [5000, 'Description cannot exceed 5000 characters']
  },
  type: {
    type: String,
    enum: {
      values: ['apartment', 'house', 'villa', 'plot', 'commercial'],
      message: '{VALUE} is not a valid property type'
    },
    required: true,
    index: true
  },

  // ==========================================
  // RENAMED: status → listingType (as per CRM requirements)
  // ==========================================
  listingType: {
    type: String,
    enum: {
      values: ['rent', 'sale'],
      message: '{VALUE} is not a valid listing type'
    },
    required: true,
    index: true
  },

  // ==========================================
  // NEW: Approval Workflow Fields
  // ==========================================
  approvalStatus: {
    type: String,
    enum: {
      values: ['pending', 'approved', 'rejected'],
      message: '{VALUE} is not a valid approval status'
    },
    default: 'pending',
    index: true
  },

  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Admin who approved/rejected
    default: null
  },

  approvedAt: {
    type: Date,
    default: null
  },

  rejectionReason: {
    type: String,
    maxlength: [500, 'Rejection reason cannot exceed 500 characters'],
    default: null
  },

  rejectedAt: {
    type: Date,
    default: null
  },

  // ==========================================
  // Existing Fields
  // ==========================================
  location: {
    address: {
      street: String,
      city: { type: String, index: true },
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
        required: true,
        validate: {
          validator: function (v) {
            return v.length === 2 &&
              v[0] >= -180 && v[0] <= 180 && // longitude
              v[1] >= -90 && v[1] <= 90;     // latitude
          },
          message: 'Invalid coordinates format'
        }
      }
    }
  },

  specifications: {
    bhk: {
      type: Number,
      required: true,
      min: [0, 'BHK cannot be negative'],
      max: [20, 'BHK seems too high']
    },
    bathrooms: {
      type: Number,
      min: 0
    },
    balconies: {
      type: Number,
      min: 0
    },
    totalFloors: {
      type: Number,
      min: 1
    },
    floorNumber: {
      type: Number,
      min: 0
    },
    superBuiltUpArea: {
      type: Number,
      min: 1
    },
    carpetArea: {
      type: Number,
      min: 1
    },
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
    type: String,
    trim: true
  }],

  media: {
    images: [{
      url: {
        type: String,
        required: true
      },
      publicId: String
    }],
    videos: [{
      url: String,
      publicId: String
    }]
  },

  price: {
    amount: {
      type: Number,
      required: true,
      min: [0, 'Price cannot be negative']
    },
    negotiable: {
      type: Boolean,
      default: false
    },
    maintenance: {
      type: Number,
      min: 0
    },
    securityDeposit: {
      type: Number,
      min: 0
    }
  },

  // ==========================================
  // DEPRECATED: Use approvalStatus instead
  // Keeping for backward compatibility
  // ==========================================
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

  // Analytics (optional)
  views: {
    type: Number,
    default: 0
  },

  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // Auto-manages createdAt and updatedAt
});

// ==========================================
// INDEXES
// ==========================================
propertySchema.index({ 'location.coordinates': '2dsphere' });
propertySchema.index({ approvalStatus: 1, listingType: 1 }); // Public queries
propertySchema.index({ owner: 1, approvalStatus: 1 }); // User's properties
propertySchema.index({ approvalStatus: 1, createdAt: -1 }); // Admin pending queue
propertySchema.index({ 'location.address.city': 1, listingType: 1 }); // City search

// ==========================================
// PRE-SAVE MIDDLEWARE
// ==========================================
propertySchema.pre('save', function (next) {
  // Sync verification with approvalStatus (backward compatibility)
  if (this.isModified('approvalStatus')) {
    this.verification.isVerified = this.approvalStatus === 'approved';
    if (this.approvalStatus === 'approved') {
      this.verification.verificationDate = this.approvedAt;
      this.verification.verifiedBy = this.approvedBy;
    }
  }

  this.updatedAt = Date.now();
  next();
});

// ==========================================
// INSTANCE METHODS
// ==========================================

// Approve property (Admin only - enforce in controller)
propertySchema.methods.approve = function (adminId) {
  if (this.approvalStatus === 'approved') {
    throw new Error('Property is already approved');
  }

  this.approvalStatus = 'approved';
  this.approvedBy = adminId;
  this.approvedAt = new Date();
  this.rejectionReason = null;
  this.rejectedAt = null;

  return this.save();
};

// Reject property (Admin only)
propertySchema.methods.reject = function (adminId, reason) {
  if (this.approvalStatus === 'rejected') {
    throw new Error('Property is already rejected');
  }

  if (!reason || reason.trim().length === 0) {
    throw new Error('Rejection reason is required');
  }

  this.approvalStatus = 'rejected';
  this.approvedBy = adminId;
  this.rejectionReason = reason;
  this.rejectedAt = new Date();
  this.approvedAt = null;

  return this.save();
};

// Check if property is publicly visible
propertySchema.methods.isPublic = function () {
  return this.approvalStatus === 'approved' && this.availability.isAvailable;
};

// Mark as sold/rented
propertySchema.methods.markAsUnavailable = function () {
  this.availability.isAvailable = false;
  return this.save();
};

// Reactivate property
propertySchema.methods.markAsAvailable = function () {
  if (this.approvalStatus !== 'approved') {
    throw new Error('Only approved properties can be made available');
  }
  this.availability.isAvailable = true;
  return this.save();
};

// Increment view count
propertySchema.methods.incrementViews = async function () {
  this.views += 1;
  return this.save();
};

// Check if user owns this property
propertySchema.methods.isOwnedBy = function (userId) {
  return this.owner.toString() === userId.toString();
};

// ==========================================
// STATIC METHODS
// ==========================================

// Get all pending properties (Admin)
propertySchema.statics.getPendingProperties = function () {
  return this.find({ approvalStatus: 'pending' })
    .populate('owner', 'name email phone')
    .sort({ createdAt: 1 }); // Oldest first (FIFO)
};

// Get all properties by status (Admin)
propertySchema.statics.getByApprovalStatus = function (status) {
  return this.find({ approvalStatus: status })
    .populate('owner', 'name email phone')
    .populate('approvedBy', 'name email')
    .sort({ createdAt: -1 });
};

// Get approved public properties (Public API)
propertySchema.statics.getPublicProperties = function (filters = {}) {
  const query = {
    approvalStatus: 'approved',
    'availability.isAvailable': true,
    ...filters
  };

  return this.find(query)
    .select('-verification -approvedBy -rejectionReason')
    .populate('owner', 'name email phone')
    .sort({ createdAt: -1 });
};

// Get properties by city (Public)
propertySchema.statics.getByCity = function (city, listingType = null) {
  const query = {
    approvalStatus: 'approved',
    'availability.isAvailable': true,
    'location.address.city': new RegExp(city, 'i')
  };

  if (listingType) {
    query.listingType = listingType;
  }

  return this.find(query)
    .populate('owner', 'name phone')
    .sort({ createdAt: -1 });
};

// Get user's own properties (all statuses)
propertySchema.statics.getByOwner = function (ownerId) {
  return this.find({ owner: ownerId })
    .populate('approvedBy', 'name')
    .sort({ createdAt: -1 });
};

// Search nearby properties (geospatial)
propertySchema.statics.findNearby = function (longitude, latitude, maxDistance = 5000) {
  return this.find({
    approvalStatus: 'approved',
    'availability.isAvailable': true,
    'location.coordinates': {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        },
        $maxDistance: maxDistance // in meters
      }
    }
  }).populate('owner', 'name phone');
};

// Advanced search with filters
propertySchema.statics.advancedSearch = function (filters) {
  const query = {
    approvalStatus: 'approved',
    'availability.isAvailable': true
  };

  if (filters.listingType) query.listingType = filters.listingType;
  if (filters.type) query.type = filters.type;
  if (filters.city) query['location.address.city'] = new RegExp(filters.city, 'i');
  if (filters.minPrice) query['price.amount'] = { $gte: filters.minPrice };
  if (filters.maxPrice) query['price.amount'] = { ...query['price.amount'], $lte: filters.maxPrice };
  if (filters.bhk) query['specifications.bhk'] = filters.bhk;
  if (filters.furnishing) query['specifications.furnishing'] = filters.furnishing;

  return this.find(query)
    .populate('owner', 'name phone')
    .sort({ createdAt: -1 });
};

// Get property statistics (Admin dashboard)
propertySchema.statics.getStatistics = async function () {
  const stats = await this.aggregate([
    {
      $group: {
        _id: '$approvalStatus',
        count: { $sum: 1 }
      }
    }
  ]);

  const result = {
    pending: 0,
    approved: 0,
    rejected: 0,
    total: 0
  };

  stats.forEach(stat => {
    result[stat._id] = stat.count;
    result.total += stat.count;
  });

  return result;
};

// ==========================================
// VIRTUALS
// ==========================================
propertySchema.virtual('statusDisplay').get(function () {
  return {
    pending: '⏳ Pending Review',
    approved: '✅ Approved',
    rejected: '❌ Rejected'
  }[this.approvalStatus];
});

// ==========================================
// QUERY HELPERS
// ==========================================
propertySchema.query.approved = function () {
  return this.where({ approvalStatus: 'approved' });
};

propertySchema.query.pending = function () {
  return this.where({ approvalStatus: 'pending' });
};

propertySchema.query.available = function () {
  return this.where({ 'availability.isAvailable': true });
};

const Property = mongoose.model('Property', propertySchema);

module.exports = Property;
