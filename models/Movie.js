const mongoose = require('mongoose');
const {appConfig} = require('../config');

const Schema = mongoose.Schema; // nos ayuda a definir nuestros modelos

// Movie va a ser una tabla (en Mongo se le llama Collections)
const MovieSchema = Schema({
    title:{type: String, unique: true, required: false},
    year: Number,
    rated: String,
    genre: String,
    director: String,
    plot: String,
    imageURL: String,
    ratingData: Object
}, {
    timestamps: true // nos crea por defecto dos campos: createdAt, updateAt
})

MovieSchema.methods.setImgUrl = function setImgUrl(filename){
    const {host, port} = appConfig;

    // con el this accedemos a la propiedades del esquema definido arriba
    this.imageURL = `${host}:${port}/public/${filename}`
}
module.exports = mongoose.model('Movies', MovieSchema)