const express = require('express');
const router = express.Router();
const { getTemples, getTempleById, createTemple } = require('../controllers/templeController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/')
    .get(getTemples)
    .post(protect, authorize('ADMIN', 'ORGANIZER'), createTemple);

router.route('/:id')
    .get(getTempleById);

module.exports = router;
