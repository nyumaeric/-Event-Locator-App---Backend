const amqp = require('amqplib');

const QUEUE_NAME = 'event_notifications';

async function connectQueue() {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        await channel.assertQueue(QUEUE_NAME, { durable: true });
        console.log(`Connected to queue: ${QUEUE_NAME}`);
        return channel;
    } catch (error) {
        console.error('Error connecting to the message queue:', error);
        throw error;
    }
}

module.exports = {
    QUEUE_NAME,
    connectQueue,
};