const express = require('express');
const api = express.Router();
const {addRating, getRatings, deleteRating, updateRating} = require('../controllers/ratingController');
const auth = require('../middlewares/auth');

// Create a new Rating
api.post('/ratings', addRating);

// Retrieve all Rating
api.get('/ratings', getRatings);

// Delete a Rating 
api.delete('/ratings/:ratingId', deleteRating);

// Update a Rating 
api.put('/ratings/:ratingId', updateRating);

module.exports = api;