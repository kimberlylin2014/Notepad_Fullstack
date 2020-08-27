const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const bodyParser = require('body-parser');
const knex = require('knex');

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

app.get("/", (req, res) => {
    res.json('test')
})

// Register User
app.post('/register', (req, res) => {
    const {name, email, password } = req.body;
    const hash = bcrypt.hashSync(password);
    db.transaction(tx => {
        tx('login')
            .returning("email")
            .insert({
                hash: hash,
                email: email
            })
            .then(loggedEmail => {
                return tx('users')
                    .returning("*")
                    .insert({
                        email: loggedEmail[0],
                        name: name,
                        joined: new Date(),
                    })
                    .then(user => {
                        res.json(user[0])
                    })
            })
            .then(tx.commit)
            .catch(tx.rollback)
    })
    .catch(error => res.status(400).json("unable to register"))
})

// SIGN IN USER AND VALIDATE IF USER EXISTS IN DATABASE
app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    db('login')
        .where({email: email})
        .select("*")
        .then(user => {
            const isValid = bcrypt.compareSync(password, user[0].hash);
            if(isValid) {
                console.log('is valid')
                db('users').where({email: email})
                    .select('*')
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to send user'))
            } else {
                console.log('not valid')
                res.status(400).json("Password incorrect")
            }
        })
        .catch(err => res.status(400).json('Email does not exist'))
});

// CREATE NEW POST
app.post('/users/:id/createPost', (req, res) => {
    const currentUserID = req.params.id;
    const { postText } = req.body;
    db.transaction(tx => {
        tx('posts')
            .returning("*")
            .insert({
                post: postText
            })
            .then(data => {
                return tx('users')
                    .where({id: currentUserID})
                    .update({comments: tx.raw('array_append(comments, ?)', [data[0].id])})
                    .returning("*")
                    .then(updatedUser => {
                        console.log(updatedUser)
                        return updatedUser[0]
                    })
                    .then(user => {
                        console.log(user.comments)
                        tx('posts')
                            .returning('*')
                            .whereIn('id', [...user.comments])
                            .then(posts => {
                                const info = {
                                    currentUser: user,
                                    postArray: posts
                                }
                                res.json(info);
                            })
                    })
            })
            .then(tx.commit)
            .catch(tx.rollback)
    })
    .catch(err => res.status(400).json("unable to create new post"))  
})

// GET ALL USER POSTS
app.get('/users/:userID/posts', (req, res) => {
    const { userID } = req.params;
    db.transaction(tx => {
        tx('users')
            .where({id: userID})
            .returning('*')
            .then(data =>{
                const commentIDs = data[0].comments;
                return tx('posts')
                    .returning('*')
                    .whereIn('id', [...commentIDs])
                    .then(data => {
                        res.json(data)
                    })
            })
            .then(tx.commit)
            .catch(tx.rollback)
    })
    .catch(err => console.log(err))
})

// UPDATE POST BY POST ID
app.put('/posts/:postID/update', (req, res) => {
    const {text, userID} = req.body;
    const {postID} = req.params;
    db.transaction(tx => {
        tx('posts')
            .where({id: postID})
            .update({post: text})
            .returning("*")
            .then(updatedPost => {
                return tx('users')
                    .where({id: userID})
                    .returning("*")
                    .then(foundUser => {
                        const commentIDs = foundUser[0].comments;
                        return tx("posts")
                            .returning("*")
                            .whereIn('id', [...commentIDs])
                            .then(commentArray => {
                                res.json(commentArray)
                            })
                    })
            })
            .then(tx.commit)
            .catch(tx.rollback)
    })
    .catch(error => res.status(400).json("unable to update post"))
})

app.delete("/user/:userID/posts/:postID/delete", (req, res) => {
    const { postID, userID } = req.params;
    console.log(userID)
    console.log(postID)
    const { currentUser, postData } = req.body;
    console.log(currentUser.comments)
    const updatedCommentsArray = currentUser.comments.filter(post => post !== postID)
    console.log(updatedCommentsArray)
    db.transaction(tx => {
        tx('posts')
            .where({id: postID})
            .del()
            .then(deletedPost => {
               return tx('users')
                    .where({id: userID})
                    .update({comments: updatedCommentsArray})
                    .returning("*")
                    .then(user => {
                        console.log(user)
                        res.json(user[0]);
                    })
            })    
            .then(tx.commit)
            .catch(tx.rollback)
           
    })
    .catch(error => console.log(error))
})

app.listen(3000, () => console.log('Server starting at Port 3000'));