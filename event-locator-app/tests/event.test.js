const request = require('supertest');
const app = require('../src/app');
const { Event } = require('../src/models/eventModel');

describe('Event Management', () => {
    let eventId;

    beforeAll(async () => {
        // Clear the events collection before tests
        await Event.deleteMany({});
    });

    afterAll(async () => {
        // Clear the events collection after tests
        await Event.deleteMany({});
    });

    it('should create a new event', async () => {
        const res = await request(app)
            .post('/api/events')
            .send({
                title: 'Test Event',
                description: 'This is a test event',
                location: { latitude: 40.7128, longitude: -74.0060 },
                dateTime: new Date(),
                categories: ['Music', 'Art']
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('event');
        eventId = res.body.event._id; // Store the event ID for later tests
    });

    it('should get all events', async () => {
        const res = await request(app).get('/api/events');

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('events');
        expect(res.body.events.length).toBeGreaterThan(0);
    });

    it('should update an event', async () => {
        const res = await request(app)
            .put(`/api/events/${eventId}`)
            .send({
                title: 'Updated Test Event',
                description: 'This is an updated test event',
                location: { latitude: 40.7128, longitude: -74.0060 },
                dateTime: new Date(),
                categories: ['Music', 'Theater']
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('event');
        expect(res.body.event.title).toEqual('Updated Test Event');
    });

    it('should delete an event', async () => {
        const res = await request(app).delete(`/api/events/${eventId}`);

        expect(res.statusCode).toEqual(204);
    });
});