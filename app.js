// configura todo lo relacionado a express (middleware and routes)
const express = require('express');
const bodyParser = require('body-parser');
const movieRoutes = require('./routes/movie');
const userRoutes = require('./routes/user');
const ratingRoutes = require('./routes/rating');
const cors = require('cors')
 
const app = express();
app.use(cors()); // se declara dsp del app
app.use(bodyParser.urlencoded({extended: false})); // will parser the body
app.use(bodyParser.json()) // will parser the body with format .json

// redefinimos la ruta real para guardar las imagenes
// _dirname = ruta absoluta
app.use('/public', express.static(`${__dirname}/storage/imgs`))
app.use('/v1', movieRoutes)
app.use('/v1', userRoutes)
app.use('/v1', ratingRoutes)

module.exports = app;