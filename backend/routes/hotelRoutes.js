const express = require('express');
const router = express.Router();
const { getHotels, getHotelById, createHotel } = require('../controllers/hotelController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/')
    .get(getHotels)
    .post(protect, authorize('ADMIN', 'ORGANIZER'), createHotel);

router.route('/:id')
    .get(getHotelById);

module.exports = router;
