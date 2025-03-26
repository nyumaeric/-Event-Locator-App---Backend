const Queue = require('bull');
const queueConfig = require('../config/queueConfig');
const { sendNotification } = require('../controllers/notificationController');

const notificationQueue = new Queue('notificationQueue', queueConfig);

const enqueueNotification = (userId, eventDetails) => {
    notificationQueue.add({ userId, eventDetails });
};

const processNotifications = () => {
    notificationQueue.process(async (job) => {
        const { userId, eventDetails } = job.data;
        await sendNotification(userId, eventDetails);
    });
};

module.exports = {
    enqueueNotification,
    processNotifications,
};