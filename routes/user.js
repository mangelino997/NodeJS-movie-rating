const express = require('express');
const api = express.Router();
const {signIn, signUp, getUser} = require('../controllers/userController');
const isAuth = require('../middlewares/auth');

// get current user logged
api.get('/user', isAuth, getUser);

// Signup a new User
api.post('/signup' , signUp);

// Login
api.post('/signin', signIn)

module.exports = api;