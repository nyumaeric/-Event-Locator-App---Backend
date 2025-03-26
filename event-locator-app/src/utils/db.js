const { Pool } = require('pg');
const dbConfig = require('../config/dbConfig');

const pool = new Pool(dbConfig);

const query = (text, params) => {
    return pool.query(text, params);
};

const getClient = async () => {
    const client = await pool.connect();
    return client;
};

const endPool = () => {
    return pool.end();
};

module.exports = {
    query,
    getClient,
    endPool,
};