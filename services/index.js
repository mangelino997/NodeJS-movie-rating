'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const { jwtConfig } = require('../config')

/* create the token */
function createToken(user) {

    // poner solo informacion basica del usuario por seguridad
    const payload = {
        sub: user._id, // enviamos el id 
        iat: moment().unix(), /* fecha de creacion del token */
        exp: moment().add(14, 'days').unix() /* el token caduca en 14 dias */
    }

    return jwt.encode(payload, jwtConfig.SECRET_TOKEN)
}

/* decode the token */
function decodeToken(token) {

    /* generamos una promesa */
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, jwtConfig.SECRET_TOKEN)
            /* comprueba si el token es valido (si ha caducado o es falso)
            * si el tiempo de expiracion es menor al momento actual
            */
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                })
            }
            resolve(payload.sub)
        } catch (error) {
            reject({
                status: 500,
                message: 'Invalid token'
            })
        }
    })

    return decoded
}
module.exports = {
    createToken,
    decodeToken
}