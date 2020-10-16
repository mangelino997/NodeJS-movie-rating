'use strict'
const services = require('../services/index')

function isAuth(req, res, next){

    // comprueba si en el header de la peticion pasamos un token
    if(!req.headers['authorization']){
        return res.status(403).send({message: 'No tienes autorización'})
    }

    // extrae el token separandolo del Bearer
    const token = req.headers['authorization'].split(" ")[1]
    
   services.decodeToken(token)
   .then(res => {
       req.user = res // lo obtenemos del resolve(payload.sub)
       next()
   })
   .catch(err =>{
       res.status(err.status)
   })
}

module.exports = isAuth