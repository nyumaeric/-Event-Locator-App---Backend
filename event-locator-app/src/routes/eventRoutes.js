const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Route to create a new event
router.post('/', eventController.createEvent);

// Route to get all events
router.get('/', eventController.getEvents);

// Route to update an event by ID
router.put('/:id', eventController.updateEvent);

// Route to delete an event by ID
router.delete('/:id', eventController.deleteEvent);

module.exports = router;