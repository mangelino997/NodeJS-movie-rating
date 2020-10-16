// import model rating
const Rating = require('../models/Rating');

// add new rating
async function addRating(req, res) {
    try {
        const rating = Rating(req.body);

        const rated = await rating.save();
        res.status(201).send({ rated });
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// get ratings
async function getRatings(req, res) {
    try {
        const ratings = await Rating.find().lean().exec()
        res.status(200).send({ ratings })
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
}

// delete rating
async function deleteRating(req, res) {
    try {
        await Rating.findByIdAndDelete(req.params.ratingId)
        res.send({ message: "Rating deleted successfully!" + req.params.ratingId });
    } catch (err) {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Rating not found with id " + req.params.ratingId
            });
        }
        return res.status(500).send({
            message: "Could not delete Rating with id " + req.params.ratingId
        });
    }
}

// update a rating 
async function updateRating(req, res) {

    try {
        const rating = Rating(req.body);
        const ratingUpdated = await Movie.findByIdAndUpdate(req.params.movieId,
            movie
            , { new: true }) // {new: true} option return the modified document
        res.status(200).send({ ratingUpdated });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Rating not found with id " + req.params.ratingId
            });
        }
        return res.status(500).send({
            message: "Error updating Rating with id " + req.params.ratingId
        });
    }
}

module.exports = {
    addRating,
    getRatings,
    deleteRating,
    updateRating
}