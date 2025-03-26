const request = require('supertest');
const app = require('../src/app'); // Adjust the path as necessary
const User = require('../src/models/userModel');
const bcrypt = require('bcrypt');

describe('Authentication Tests', () => {
    beforeAll(async () => {
        await User.deleteMany(); // Clear the user collection before tests
    });

    afterAll(async () => {
        await User.deleteMany(); // Clean up after tests
    });

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'testpassword',
                location: 'Test Location',
                preferredCategories: ['music', 'art']
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('user');
        expect(response.body.user.username).toBe('testuser');
    });

    it('should login an existing user', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('should not login with incorrect password', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                username: 'testuser',
                password: 'wrongpassword'
            });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('message', 'Invalid credentials');
    });

    it('should not register a user with an existing username', async () => {
        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'testuser',
                password: 'testpassword',
                location: 'Test Location',
                preferredCategories: ['music', 'art']
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('message', 'Username already exists');
    });
});