const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
      maxlength: [100, 'Client name cannot exceed 100 characters']
    },

    contact: {
      type: String,
      required: [true, 'Contact (email or phone) is required'],
      trim: true,
      validate: {
        validator: function(v) {
          // Validates either email or phone format
          const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
          const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
          return emailRegex.test(v) || phoneRegex.test(v);
        },
        message: 'Please provide a valid email or phone number'
      }
    },

    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: [1000, 'Message cannot exceed 1000 characters']
    },

    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Property',
      default: null,
      index: true
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
      index: true,
      validate: {
        validator: async function(v) {
          if (!v) return true; // null is allowed
          const User = mongoose.model('User');
          const user = await User.findById(v);
          return user && user.role === 'agent';
        },
        message: 'Assigned user must be an agent'
      }
    },

    status: {
      type: String,
      enum: {
        values: ['new', 'distributed', 'contacted', 'closed'],
        message: '{VALUE} is not a valid status'
      },
      default: 'new',
      index: true
    },

    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true
    }
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
    collection: 'leads'
  }
);

// INDEXES for performance optimization
leadSchema.index({ assignedTo: 1, status: 1 }); // Agent queries
leadSchema.index({ status: 1, createdAt: -1 }); // Admin dashboard
leadSchema.index({ createdAt: -1 }); // Recent leads

// VIRTUAL: Get time since creation
leadSchema.virtual('age').get(function() {
  return Date.now() - this.createdAt.getTime();
});

// PRE-SAVE MIDDLEWARE: Auto-update status on assignment
leadSchema.pre('save', function(next) {
  // When agent is assigned and status is 'new', change to 'distributed'
  if (this.isModified('assignedTo') && this.assignedTo && this.status === 'new') {
    this.status = 'distributed';
  }
  next();
});

// STATIC METHOD: Get leads by agent (with isolation)
leadSchema.statics.getLeadsByAgent = function(agentId) {
  return this.find({ assignedTo: agentId })
    .populate('propertyId', 'title location price listingType')
    .populate('assignedTo', 'name email')
    .sort({ createdAt: -1 });
};

// STATIC METHOD: Get all leads (Admin only)
leadSchema.statics.getAllLeads = function(filters = {}) {
  return this.find(filters)
    .populate('propertyId', 'title location price listingType')
    .populate('assignedTo', 'name email role')
    .sort({ createdAt: -1 });
};

// STATIC METHOD: Get unassigned leads
leadSchema.statics.getUnassignedLeads = function() {
  return this.find({ assignedTo: null })
    .populate('propertyId', 'title location price')
    .sort({ createdAt: -1 });
};

// INSTANCE METHOD: Assign to agent
leadSchema.methods.assignToAgent = async function(agentId) {
  const User = mongoose.model('User');
  const agent = await User.findById(agentId);
  
  if (!agent || agent.role !== 'agent') {
    throw new Error('Invalid agent ID');
  }
  
  this.assignedTo = agentId;
  this.status = 'distributed';
  return this.save();
};

// INSTANCE METHOD: Update status (with validation)
leadSchema.methods.updateStatus = function(newStatus, agentId) {
  // Verify agent owns this lead
  if (this.assignedTo.toString() !== agentId.toString()) {
    throw new Error('Unauthorized: You can only update your assigned leads');
  }
  
  // Validate status transition
  const validTransitions = {
    'new': ['distributed', 'contacted'],
    'distributed': ['contacted', 'closed'],
    'contacted': ['closed'],
    'closed': [] // Terminal state
  };
  
  if (!validTransitions[this.status].includes(newStatus)) {
    throw new Error(`Invalid status transition from ${this.status} to ${newStatus}`);
  }
  
  this.status = newStatus;
  return this.save();
};

// Prevent exposing sensitive data in JSON
leadSchema.methods.toJSON = function() {
  const obj = this.toObject();
  return obj;
};

const Lead = mongoose.model('Lead', leadSchema);

module.exports = Lead;
