const mongoose = require('mongoose');

const hotelBookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true,
    },
    rooms: {
        type: Number,
        required: true,
        min: 1,
    },
    guests: {
        type: Number,
        required: true,
        min: 1,
    },
    checkInDate: {
        type: String,
        required: true,
    },
    checkOutDate: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
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
    },
}, { timestamps: true });

module.exports = mongoose.model('HotelBooking', hotelBookingSchema);
