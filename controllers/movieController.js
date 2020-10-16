// controllers

// import model movies
const Movie = require('../models/Movie');
// import model Rating
const Rating = require('../models/Rating')

// add new movie
async function addMovie(req, res) {
    try {
        const movie = Movie(req.body);

        // verifica si la request viene acompañada de un file (para tratarlo primero)
        if (req.file) {
            const { filename } = req.file;
            movie.setImgUrl(filename);
        }
        const movieStored = await movie.save();
        res.status(201).send({ movieStored });
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// get movies
async function getMovies(req, res) {
    try {
        /*
         find(): me devuelve todas las movies
         lean(): me transforma el resultado a json
         exec(): ejecuta la consulta
        */
        const movies = await Movie.find().lean().exec()
        res.status(200).send({ movies })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// delete movie
async function deleteMovie(req, res) {
    try {
        await Movie.findByIdAndDelete(req.params.movieId)
        // find and remove all ratings with idMovie = req.params.movieId
        await Rating.find({ idMovie: req.params.movieId }).remove()
        res.send({ message: "Movie deleted successfully!" + req.params.movieId });
    } catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });
        }
        return res.status(500).send({
            message: "Could not delete movie with id " + req.params.movieId
        });
    }
}

// update a movie identified by the movieId in the request
async function updateMovie(req, res) {

    try {
        const movie = Movie(req.body);
        if (req.file) {
            const { filename } = req.file;
            movie.setImgUrl(filename);
        }
        const movieUpdated = await Movie.findByIdAndUpdate(req.params.movieId,
            movie
            , { new: true }) // {new: true} option return the modified document
        res.status(200).send({ movieUpdated, movie });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Movie not found with id " + req.params.movieId
            });
        }
        return res.status(500).send({
            message: "Error updating Movie with id " + req.params.movieId
        });
    }
}

module.exports = {
    addMovie,
    getMovies,
    deleteMovie,
    updateMovie
}