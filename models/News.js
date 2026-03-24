const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [200, 'Title cannot be more than 200 characters'],
        index: true
    },

    // SEO-friendly URL slug
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },

    content: {
        type: String,
        required: [true, 'Please add content'],
        minlength: [50, 'Content must be at least 50 characters']
    },

    // Short description for previews
    excerpt: {
        type: String,
        maxlength: [300, 'Excerpt cannot be more than 300 characters'],
        trim: true
    },

    category: {
        type: String,
        required: true,
        enum: {
            values: ['Market Trends', 'Infrastructure', 'Guide', 'Report', 'General', 'Policy Updates'],
            message: '{VALUE} is not a valid category'
        },
        index: true
    },

    // Reference to admin who created the news
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    author: {
        type: String,
        default: 'Admin',
        trim: true
    },

    status: {
        type: String,
        enum: {
            values: ['Published', 'Draft', 'Archived'],
            message: '{VALUE} is not a valid status'
        },
        default: 'Draft',
        index: true
    },

    // Featured image
    featuredImage: {
        url: {
            type: String,
            default: null
        },
        publicId: {
            type: String,
            default: null
        },
        alt: {
            type: String,
            default: 'News image'
        }
    },

    // Additional media
    media: {
        images: [{
            url: String,
            publicId: String,
            caption: String
        }],
        videos: [{
            url: String,
            publicId: String
        }]
    },

    // SEO fields
    seo: {
        metaTitle: {
            type: String,
            maxlength: 60
        },
        metaDescription: {
            type: String,
            maxlength: 160
        },
        keywords: [{
            type: String,
            trim: true
        }]
    },

    // Analytics
    views: {
        type: Number,
        default: 0,
        min: 0
    },

    // Social sharing count (optional)
    shares: {
        type: Number,
        default: 0,
        min: 0
    },

    // Featured on homepage
    isFeatured: {
        type: Boolean,
        default: false,
        index: true
    },

    // Publishing schedule
    publishedAt: {
        type: Date,
        default: null
    },

    // Last updated by admin
    lastUpdatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },

    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
}, {
    timestamps: true // Adds createdAt and updatedAt
});

// ==========================================
// INDEXES
// ==========================================
NewsSchema.index({ status: 1, publishedAt: -1 }); // Public news queries
NewsSchema.index({ category: 1, status: 1 }); // Category filtering
NewsSchema.index({ isFeatured: 1, status: 1 }); // Featured news
NewsSchema.index({ createdBy: 1 }); // Admin's articles
NewsSchema.index({ title: 'text', content: 'text' }); // Full-text search

// ==========================================
// PRE-SAVE MIDDLEWARE
// ==========================================

// Auto-generate slug from title
NewsSchema.pre('save', function (next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim() + '-' + Date.now();
    }
    next();
});

// Auto-generate excerpt from content if not provided
NewsSchema.pre('save', function (next) {
    if (!this.excerpt && this.content) {
        // Extract first 150 chars without HTML tags
        const plainText = this.content.replace(/<[^>]*>/g, '');
        this.excerpt = plainText.substring(0, 150).trim() + '...';
    }
    next();
});

// Set publishedAt when status changes to Published
NewsSchema.pre('save', function (next) {
    if (this.isModified('status') && this.status === 'Published' && !this.publishedAt) {
        this.publishedAt = new Date();
    }
    next();
});

// ==========================================
// INSTANCE METHODS
// ==========================================

// Publish article (Admin only - enforce in controller)
NewsSchema.methods.publish = function (adminId) {
    if (this.status === 'Published') {
        throw new Error('Article is already published');
    }

    this.status = 'Published';
    this.publishedAt = new Date();
    this.lastUpdatedBy = adminId;

    return this.save();
};

// Unpublish article (move to draft)
NewsSchema.methods.unpublish = function (adminId) {
    if (this.status !== 'Published') {
        throw new Error('Only published articles can be unpublished');
    }

    this.status = 'Draft';
    this.lastUpdatedBy = adminId;

    return this.save();
};

// Archive article
NewsSchema.methods.archive = function (adminId) {
    this.status = 'Archived';
    this.lastUpdatedBy = adminId;

    return this.save();
};

// Restore archived article
NewsSchema.methods.restore = function (adminId) {
    if (this.status !== 'Archived') {
        throw new Error('Only archived articles can be restored');
    }

    this.status = 'Draft';
    this.lastUpdatedBy = adminId;

    return this.save();
};

// Toggle featured status
NewsSchema.methods.toggleFeatured = function () {
    if (this.status !== 'Published') {
        throw new Error('Only published articles can be featured');
    }

    this.isFeatured = !this.isFeatured;
    return this.save();
};

// Increment view count
NewsSchema.methods.incrementViews = async function () {
    this.views += 1;
    // Use update to avoid triggering validation on other fields
    return mongoose.model('News').findByIdAndUpdate(
        this._id,
        { $inc: { views: 1 } },
        { new: false }
    );
};

// Increment share count
NewsSchema.methods.incrementShares = async function () {
    return mongoose.model('News').findByIdAndUpdate(
        this._id,
        { $inc: { shares: 1 } },
        { new: false }
    );
};

// Check if user created this article
NewsSchema.methods.isCreatedBy = function (userId) {
    return this.createdBy.toString() === userId.toString();
};

// ==========================================
// STATIC METHODS
// ==========================================

// Get all published news (Public)
NewsSchema.statics.getPublishedNews = function (limit = 10, skip = 0) {
    return this.find({ status: 'Published' })
        .select('-createdBy -lastUpdatedBy')
        .sort({ publishedAt: -1 })
        .limit(limit)
        .skip(skip);
};

// Get featured news (Homepage)
NewsSchema.statics.getFeaturedNews = function (limit = 5) {
    return this.find({
        status: 'Published',
        isFeatured: true
    })
        .select('title excerpt featuredImage category publishedAt views slug')
        .sort({ publishedAt: -1 })
        .limit(limit);
};

// Get news by category (Public)
NewsSchema.statics.getByCategory = function (category, limit = 10) {
    return this.find({
        status: 'Published',
        category: category
    })
        .select('-createdBy -lastUpdatedBy')
        .sort({ publishedAt: -1 })
        .limit(limit);
};

// Get single published news by slug (Public)
NewsSchema.statics.getBySlug = function (slug) {
    return this.findOne({
        slug: slug,
        status: 'Published'
    })
        .populate('createdBy', 'name')
        .select('-lastUpdatedBy');
};

// Search news (Public)
NewsSchema.statics.searchNews = function (searchTerm, limit = 10) {
    return this.find({
        status: 'Published',
        $text: { $search: searchTerm }
    })
        .select('title excerpt featuredImage category publishedAt slug')
        .sort({ score: { $meta: 'textScore' } })
        .limit(limit);
};

// Get all news by admin (Admin dashboard)
NewsSchema.statics.getByAdmin = function (adminId, status = null) {
    const query = { createdBy: adminId };
    if (status) query.status = status;

    return this.find(query)
        .sort({ createdAt: -1 });
};

// Get all drafts (Admin)
NewsSchema.statics.getAllDrafts = function () {
    return this.find({ status: 'Draft' })
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 });
};

// Get all archived (Admin)
NewsSchema.statics.getAllArchived = function () {
    return this.find({ status: 'Archived' })
        .populate('createdBy', 'name email')
        .populate('lastUpdatedBy', 'name')
        .sort({ updatedAt: -1 });
};

// Get news statistics (Admin dashboard)
NewsSchema.statics.getStatistics = async function () {
    const stats = await this.aggregate([
        {
            $group: {
                _id: '$status',
                count: { $sum: 1 },
                totalViews: { $sum: '$views' }
            }
        }
    ]);

    const categoryStats = await this.aggregate([
        { $match: { status: 'Published' } },
        {
            $group: {
                _id: '$category',
                count: { $sum: 1 }
            }
        }
    ]);

    const result = {
        byStatus: {},
        byCategory: {},
        total: 0,
        totalViews: 0
    };

    stats.forEach(stat => {
        result.byStatus[stat._id] = {
            count: stat.count,
            views: stat.totalViews
        };
        result.total += stat.count;
        result.totalViews += stat.totalViews;
    });

    categoryStats.forEach(stat => {
        result.byCategory[stat._id] = stat.count;
    });

    return result;
};

// Get trending news (most viewed in last 7 days)
NewsSchema.statics.getTrendingNews = function (limit = 10) {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return this.find({
        status: 'Published',
        publishedAt: { $gte: sevenDaysAgo }
    })
        .select('title excerpt featuredImage category publishedAt views slug')
        .sort({ views: -1 })
        .limit(limit);
};

// Get related news (same category, exclude current)
NewsSchema.statics.getRelatedNews = function (newsId, category, limit = 5) {
    return this.find({
        _id: { $ne: newsId },
        category: category,
        status: 'Published'
    })
        .select('title excerpt featuredImage publishedAt slug')
        .sort({ publishedAt: -1 })
        .limit(limit);
};

// ==========================================
// VIRTUALS
// ==========================================

// Reading time estimate (based on content length)
NewsSchema.virtual('readingTime').get(function () {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
});

// Full URL (if you have a base URL)
NewsSchema.virtual('url').get(function () {
    return `/news/${this.slug}`;
});

// ==========================================
// QUERY HELPERS
// ==========================================

NewsSchema.query.published = function () {
    return this.where({ status: 'Published' });
};

NewsSchema.query.featured = function () {
    return this.where({ isFeatured: true });
};

NewsSchema.query.byCategory = function (category) {
    return this.where({ category });
};

// Configure toJSON to include virtuals
NewsSchema.set('toJSON', { virtuals: true });
NewsSchema.set('toObject', { virtuals: true });

const News = mongoose.model('News', NewsSchema);

module.exports = News;
