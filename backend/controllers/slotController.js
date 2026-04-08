const DarshanSlot = require('../models/DarshanSlot');

// @desc    Get all slots for a temple
// @route   GET /api/slots/temple/:templeId
// @access  Public
const getSlotsByTemple = async (req, res) => {
    try {
        const slots = await DarshanSlot.find({ temple: req.params.templeId });
        res.json(slots);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create a new darshan slot
// @route   POST /api/slots
// @access  Private/Admin or Organizer
const createSlot = async (req, res) => {
    try {
        const { templeId, date, time, poojaType, totalTickets } = req.body;

        const slot = new DarshanSlot({
            temple: templeId,
            date,
            time,
            poojaType,
            totalTickets,
            availableTickets: totalTickets,
        });

        const createdSlot = await slot.save();
        res.status(201).json(createdSlot);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getSlotsByTemple,
    createSlot,
};
