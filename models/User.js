const mongoose = require('mongoose');
// encripta la password (npm i --save bcrypt-nodejs)
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const { appConfig } = require('../config');

const Schema = mongoose.Schema; // nos ayuda a definir nuestros modelos

// User va a ser una tabla (en Mongo se le llama Collections)
const UserSchema = Schema({
    email: { 
        type: String, 
        unique: true, 
        lowercase: true 
    },
    username: String,
    avatar: String,
    password: {
        type: String, 
        select: false // select: false, no nos devuelve este campo cuando hacemos un get de usuario
    }, 
    signupDate: {
        type: Date, 
        default: Date.now()
    },
    role: String,
    lastLogin: Date
})

// seria como un middleware
// se ejecuta antes de que se guarde un usuario para encriptar la password 
UserSchema.pre('save', function(next){
    let user = this // this hace referencia a UserSchema
    if(!user.isModified('password')) return next()

    bcrypt.genSalt(10, (err, salt) => {
        if(err) return next() // si hay un error pasa al sig middleware

        bcrypt.hash(user.password, salt, null, (err, hash) =>{
            if(err) return next(err)

            user.password = hash
            next()
        })
    })
} )

// genera un avatar dependiendo el correo de email
UserSchema.methods.gravatar = function(){

    // devuelve un avatar por defecto (s = size in px)
    if(!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`

    // (npm i --save crypto)
    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

// valida la password
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      cb(err, isMatch)
    });
  }
module.exports = mongoose.model('User', UserSchema)