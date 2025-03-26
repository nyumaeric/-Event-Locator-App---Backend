const notificationService = require('../services/notificationService');

exports.sendNotification = async (req, res) => {
    const { userId, message } = req.body;

    try {
        await notificationService.enqueueNotification(userId, message);
        res.status(200).json({ success: true, message: 'Notification queued successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to queue notification.', error: error.message });
    }
};

exports.getNotifications = async (req, res) => {
    const { userId } = req.params;

    try {
        const notifications = await notificationService.getUserNotifications(userId);
        res.status(200).json({ success: true, notifications });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve notifications.', error: error.message });
    }
};