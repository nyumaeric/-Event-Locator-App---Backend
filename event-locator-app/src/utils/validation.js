const { body, validationResult } = require('express-validator');

const validateUserRegistration = [
    body('username')
        .isString()
        .withMessage('Username must be a string')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long'),
    body('password')
        .isString()
        .withMessage('Password must be a string')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('location')
        .isObject()
        .withMessage('Location must be an object with latitude and longitude'),
    body('preferredCategories')
        .isArray()
        .withMessage('Preferred categories must be an array'),
];

const validateEventCreation = [
    body('title')
        .isString()
        .withMessage('Title must be a string')
        .notEmpty()
        .withMessage('Title is required'),
    body('description')
        .isString()
        .withMessage('Description must be a string')
        .notEmpty()
        .withMessage('Description is required'),
    body('location')
        .isObject()
        .withMessage('Location must be an object with latitude and longitude'),
    body('dateTime')
        .isISO8601()
        .withMessage('Date and time must be a valid ISO 8601 date string'),
    body('categories')
        .isArray()
        .withMessage('Categories must be an array'),
];

const validateInput = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateUserRegistration,
    validateEventCreation,
    validateInput,
};