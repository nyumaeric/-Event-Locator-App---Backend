const { Client } = require('pg');
const { Pool } = require('pg');

// Initialize PostgreSQL client
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Function to find events within a specified radius
const findEventsWithinRadius = async (latitude, longitude, radius) => {
    const query = `
        SELECT * FROM events
        WHERE ST_DWithin(
            geography(ST_MakePoint(longitude, latitude)),
            geography(ST_MakePoint($1, $2)),
            $3
        )
    `;
    const values = [longitude, latitude, radius];
    const { rows } = await pool.query(query, values);
    return rows;
};

// Function to calculate distance between two points
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};

module.exports = {
    findEventsWithinRadius,
    calculateDistance,
};