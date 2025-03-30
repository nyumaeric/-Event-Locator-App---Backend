const { sendNotification } = require('../services/notificationService'); // Adjust the path as needed

describe('Notification Service', () => {
    it('should send a notification successfully', async () => {
        const mockNotificationData = {
            recipient: 'user@example.com',
            message: 'Your event has been created successfully!',
        };

        const result = await sendNotification(mockNotificationData);

        expect(result).toBe(true); // Assuming the function returns true on success
    });

    it('should fail to send a notification with invalid data', async () => {
        const mockNotificationData = {
            recipient: '', // Invalid recipient
            message: 'This will fail',
        };

        await expect(sendNotification(mockNotificationData)).rejects.toThrow('Invalid recipient');
    });

    it('should generate the correct notification payload', () => {
        const mockEvent = {
            name: 'Music Festival',
            date: '2025-04-01',
            location: 'New York',
        };

        const payload = generateNotificationPayload(mockEvent); // Hypothetical helper function
        expect(payload).toEqual({
            subject: 'Event Reminder: Music Festival',
            body: 'Don’t forget about Music Festival on 2025-04-01 at New York!',
        });
    });
});