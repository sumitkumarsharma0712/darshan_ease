const HotelBooking = require('../models/HotelBooking');
const Hotel = require('../models/Hotel');

// @desc    Create hotel booking
// @route   POST /api/hotel-bookings
// @access  Private
const createHotelBooking = async (req, res) => {
    try {
        const { hotelId, rooms, guests, checkInDate, checkOutDate, phone, age, gender, address, emergencyContact, specialRequests } = req.body;

        const hotel = await Hotel.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        if (hotel.availableRooms < rooms) {
            return res.status(400).json({ message: 'Not enough rooms available' });
        }

        const nights = Math.max(1, Math.ceil((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24)));
        const totalPrice = hotel.pricePerNight * rooms * nights;

        const hotelBooking = new HotelBooking({
            user: req.user._id,
            hotel: hotelId,
            rooms,
            guests,
            checkInDate,
            checkOutDate,
            totalPrice,
            phone,
            age,
            gender,
            address,
            emergencyContact,
            specialRequests,
            status: 'CONFIRMED',
        });

        const createdBooking = await hotelBooking.save();
        hotel.availableRooms -= rooms;
        await hotel.save();

        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get user hotel bookings
// @route   GET /api/hotel-bookings/mybookings
// @access  Private
const getMyHotelBookings = async (req, res) => {
    try {
        const bookings = await HotelBooking.find({ user: req.user._id }).populate('hotel');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Cancel hotel booking
// @route   DELETE /api/hotel-bookings/:id
// @access  Private
const cancelHotelBooking = async (req, res) => {
    try {
        const booking = await HotelBooking.findById(req.params.id);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        if (booking.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to cancel this booking' });
        }

        booking.status = 'CANCELLED';
        await booking.save();

        const hotel = await Hotel.findById(booking.hotel);
        if (hotel) {
            hotel.availableRooms += booking.rooms;
            await hotel.save();
        }

        res.json({ message: 'Hotel booking cancelled' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createHotelBooking,
    getMyHotelBookings,
    cancelHotelBooking,
};
