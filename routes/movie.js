const express = require('express');
const upload = require('../libs/storage');
const api = express.Router();
const {addMovie, getMovies, deleteMovie, updateMovie} = require('../controllers/movieController');
const auth = require('../middlewares/auth');

// .single determina como se va a llamar el campo donde mandemos la imagen
// Create a new Movie
api.post('/movies', upload.single('image') , addMovie);

// Retrieve all Movies
api.get('/movies', getMovies);

// Delete a Movie with movieId
api.delete('/movies/:movieId', deleteMovie);

// Update a Movie with movieId
api.put('/movies/:movieId', updateMovie);

api.get('/private', auth, (req, res)=>{
    res.status(200).send({message: 'Tienes acceso'})
})

module.exports = api;