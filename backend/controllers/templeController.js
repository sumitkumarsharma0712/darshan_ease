const Temple = require('../models/Temple');

// @desc    Get all temples
// @route   GET /api/temples
// @access  Public
const getTemples = async (req, res) => {
    try {
        const temples = await Temple.find({});
        res.json(temples);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single temple
// @route   GET /api/temples/:id
// @access  Public
const getTempleById = async (req, res) => {
    try {
        const temple = await Temple.findById(req.params.id);
        if (temple) {
            res.json(temple);
        } else {
            res.status(404).json({ message: 'Temple not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create a temple
// @route   POST /api/temples
// @access  Private/Admin or Organizer
const createTemple = async (req, res) => {
    try {
        const { name, location, description, imageUrl } = req.body;

        const temple = new Temple({
            name,
            location,
            description,
            imageUrl,
            organizer: req.user._id,
        });

        const createdTemple = await temple.save();
        res.status(201).json(createdTemple);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    getTemples,
    getTempleById,
    createTemple,
};
