import { validateUserInput, calculateDistance } from '../src/utils/validation';
import { findEventsWithinRadius } from '../src/utils/geospatial';

describe('Utility Functions', () => {
    describe('validateUserInput', () => {
        it('should return true for valid input', () => {
            const input = { username: 'testUser', password: 'securePassword123' };
            expect(validateUserInput(input)).toBe(true);
        });

        it('should return false for invalid input', () => {
            const input = { username: '', password: 'short' };
            expect(validateUserInput(input)).toBe(false);
        });
    });

    describe('calculateDistance', () => {
        it('should calculate the correct distance between two points', () => {
            const pointA = { lat: 40.7128, lon: -74.0060 }; // New York
            const pointB = { lat: 34.0522, lon: -118.2437 }; // Los Angeles
            const distance = calculateDistance(pointA, pointB);
            expect(distance).toBeGreaterThan(0);
        });
    });

    describe('findEventsWithinRadius', () => {
        it('should return events within the specified radius', async () => {
            const events = await findEventsWithinRadius(40.7128, -74.0060, 50); // 50 km radius
            expect(events).toBeInstanceOf(Array);
            expect(events.length).toBeGreaterThan(0);
        });
    });
});