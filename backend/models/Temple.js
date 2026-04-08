const mongoose = require('mongoose');

const templeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        default: '',
    },
    openingHours: {
        type: String,
        default: '6:00 AM - 9:00 PM',
    },
    bestTimeToVisit: {
        type: String,
        default: 'Early morning or evening',
    },
    highlights: [String],
    rating: {
        type: Number,
        default: 4.7,
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Temple', templeSchema);
