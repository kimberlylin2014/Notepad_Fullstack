const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex');
const moment = require('moment');
const { check, validationResult } = require('express-validator')

const register = require('./controllers/register');
const signIn = require('./controllers/signIn');
const post = require('./controllers/post')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'notepad'
    }
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

// REGISTER USER
app.post('/register', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password', 'Please enter a password with 6 or more characters')
        .isLength({min: 5})
], (req, res) => {
    return register.handleRegister(req, res, db, bcrypt, validationResult);
})

// SIGN IN USER AND VALIDATE IF USER EXISTS IN DATABASE
app.post('/signin', (req, res) => {
    return signIn.handleSignIn(req, res, db, bcrypt);
});

// CREATE NEW POST
app.post('/users/:id/createPost', (req, res) => {
    return post.handleCreatePost(req, res, db, moment);
})

// GET ALL USER POSTS
app.get('/users/:userID/posts', (req, res) => {
    return post.handleGetPosts(req, res, db)
})

// UPDATE POST BY POST ID
app.put('/posts/:postID/update', (req, res) => {
    return post.handleUpdatePost(req, res, db, moment);
})

// DELETE POST BY POST ID
app.delete("/user/:userID/posts/:postID/delete", (req, res) => {
    return post.handleDeletePost(req, res, db)
})

app.listen(3000, () => console.log('Server starting at Port 3000'));