
const express = require('express');
const router = express.Router();
const { createFavorite, getFavorites, deleteFavorite, updateFavorite, getFavoriteById } = require('../controller/favoris');

// Create a new favorite
router.post('/add', createFavorite);

// Get all favorites for a user
router.get('/all', getFavorites);

// Route for getting a user's favorite computers
// router.get('/getall/:userId/', getFavorites);


// Get a favorite by ID
router.get('/:id', getFavoriteById);

// Update a favorite
router.put('/update/:id', updateFavorite);

// Delete a favorite
router.delete('/delete/:id', deleteFavorite);

module.exports = router;
