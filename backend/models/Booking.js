const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    slot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DarshanSlot',
        required: true,
    },
    persons: {
        type: Number,
        required: true,
        min: 1,
    },
    phone: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 1,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    emergencyContact: {
        name: String,
        phone: String,
    },
    specialRequests: {
        type: String,
    },
    status: {
        type: String,
        enum: ['PENDING', 'CONFIRMED', 'CANCELLED'],
        default: 'CONFIRMED',
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
