const express = require('express');
const { sendNotification, getNotifications } = require('../controllers/notificationController');

const router = express.Router();

// Route to send a notification
router.post('/send', sendNotification);

// Route to get notifications for a user
router.get('/:userId', getNotifications);

module.exports = router;