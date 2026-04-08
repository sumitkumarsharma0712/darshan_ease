const Hotel = require('../models/Hotel');

// @desc    Get all hotels
// @route   GET /api/hotels
// @access  Public
const getHotels = async (req, res) => {
    try {
        const hotels = await Hotel.find({});
        res.json(hotels);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single hotel
// @route   GET /api/hotels/:id
// @access  Public
const getHotelById = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (hotel) {
            res.json(hotel);
        } else {
            res.status(404).json({ message: 'Hotel not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create a hotel
// @route   POST /api/hotels
// @access  Private/Admin or Organizer
const createHotel = async (req, res) => {
    try {
        const { name, location, description, imageUrl, pricePerNight, availableRooms, amenities, address, rating } = req.body;

        const hotel = new Hotel({
            name,
            location,
            description,
            imageUrl,
            pricePerNight,
            availableRooms,
            amenities,
            address,
            rating,
            organizer: req.user._id,
        });

        const createdHotel = await hotel.save();
        res.status(201).json(createdHotel);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getHotels,
    getHotelById,
    createHotel,
};
