const mongoose = require('mongoose');
const {appConfig} = require('../config');

const Schema = mongoose.Schema; // define the model

// table
const RatingSchema = Schema({
    emailUser:{type: String, required: true},
    idMovie:{type: String, required: true},
    stars: Number,
}, {
    timestamps: true
})

module.exports = mongoose.model('Ratings', RatingSchema)