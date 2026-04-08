const Booking = require('../models/Booking');
const DarshanSlot = require('../models/DarshanSlot');

// @desc    Create new booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
    try {
        const { slotId, persons, phone, age, gender, address, emergencyContact, specialRequests } = req.body;

        const slot = await DarshanSlot.findById(slotId);

        if (!slot) {
            return res.status(404).json({ message: 'Slot not found' });
        }

        if (slot.availableTickets < persons) {
            return res.status(400).json({ message: 'Not enough tickets available for this slot' });
        }

        const booking = new Booking({
            user: req.user._id,
            slot: slotId,
            persons,
            phone,
            age,
            gender,
            address,
            emergencyContact,
            specialRequests,
            status: 'CONFIRMED'
        });

        const createdBooking = await booking.save();

        // Update available tickets
        slot.availableTickets -= persons;
        await slot.save();

        res.status(201).json(createdBooking);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/mybookings
// @access  Private
const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate({
            path: 'slot',
            populate: {
                path: 'temple',
                model: 'Temple'
            }
        });
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Cancel a booking
// @route   DELETE /api/bookings/:id
// @access  Private
const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Check user
        if (booking.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'User not authorized to cancel this booking' });
        }

        booking.status = 'CANCELLED';
        await booking.save();

        // Revert tickets
        const slot = await DarshanSlot.findById(booking.slot);
        if (slot) {
            slot.availableTickets += booking.persons;
            await slot.save();
        }

        res.json({ message: 'Booking cancelled' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createBooking,
    getMyBookings,
    cancelBooking,
};
