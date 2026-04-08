const mongoose = require('mongoose');

const darshanSlotSchema = new mongoose.Schema({
    temple: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Temple',
        required: true,
    },
    date: {
        type: String, // e.g., 'YYYY-MM-DD'
        required: true,
    },
    time: {
        type: String, // e.g., '06:00 AM - 08:00 AM'
        required: true,
    },
    poojaType: {
        type: String,
        required: true,
    },
    totalTickets: {
        type: Number,
        required: true,
    },
    availableTickets: {
        type: Number,
        required: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('DarshanSlot', darshanSlotSchema);
