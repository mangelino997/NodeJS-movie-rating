'use strict'

const mongoose = require('mongoose')
const User = require('../models/User')
const service = require('../services/index')

function signUp(req, res) {
    const user = new User({
        email: req.body.email, // solo recuperamos el email, los demas se establecen solos
        username: req.body.username,
        password: req.body.password
    })

    user.avatar = user.gravatar()

    user.save((err) => {
        if (err) return res.status(500).send({ message: `Email repetido` })
        // if (err) res.status(500).send({ message: `Error al crear el usuario: ${err}` })

        return res.status(200).send({ token: service.createToken(user) })
    })
}

function signIn(req, res) {
    // buscamos al usuario
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) return res.status(500).send({ message: err })

        // si no existe el usuario
        if (!user) return res.status(404).send({ message: `No existe el usuario:${req.body.email}` })

        
        return user.comparePassword(req.body.password, (err, isMatch) => {
            if (err) return res.status(500).send({ message: `Error al ingresar: ${err}` })
            if (!isMatch) return res.status(404).send({ message: `Error de contraseña: ${req.body.email}` })

            req.user = user
            res.status(200).send({
                message: 'Logueado correctamente',
                token: service.createToken(user)
            })
        })

    }).select('_id email +password')
    /* sino hacemos esto mongo no nos retorna el password, 
    * por q lo pusimos como select:false al momento de crear el schema
    */
}

function getUser(req, res){
    let userData = {}
    User.findOne({_id: req.user}, (err, user) =>{
        if (err) return res.status(500).send({ message: err })

        // si no obtuvo data del usuario
        if (!user) return res.status(404).send({ message: `Error al obtener datos del usuario` })

        userData.credentials = user
        return res.status(200).send({
            userData
        })
    })
}

module.exports = {
    signUp,
    signIn,
    getUser
}