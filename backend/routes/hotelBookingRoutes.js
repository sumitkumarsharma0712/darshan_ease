const express = require('express');
const router = express.Router();
const { createHotelBooking, getMyHotelBookings, cancelHotelBooking } = require('../controllers/hotelBookingController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, createHotelBooking);

router.route('/mybookings')
    .get(protect, getMyHotelBookings);

router.route('/:id')
    .delete(protect, cancelHotelBooking);

module.exports = router;
