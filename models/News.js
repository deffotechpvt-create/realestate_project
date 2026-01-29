const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    content: {
        type: String,
        required: [true, 'Please add content']
    },
    category: {
        type: String,
        required: true,
        enum: ['Market Trends', 'Infrastructure', 'Guide', 'Report', 'General']
    },
    author: {
        type: String,
        default: 'Admin'
    },
    status: {
        type: String,
        enum: ['Published', 'Draft', 'Archived'],
        default: 'Draft'
    },
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('News', NewsSchema);
