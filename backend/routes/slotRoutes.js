const express = require('express');
const router = express.Router();
const { getSlotsByTemple, createSlot } = require('../controllers/slotController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

router.route('/')
    .post(protect, authorize('ADMIN', 'ORGANIZER'), createSlot);

router.get('/temple/:templeId', getSlotsByTemple);

module.exports = router;
