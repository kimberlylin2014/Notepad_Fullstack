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

app.post('/register', (req, res) => {
    const {name, email, password } = req.body;
    const hash = bcrypt.hashSync(password);
    console.log(name + email + hash)
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

app.post('/signin', (req, res) => {
    const { email, password } = req.body;
    // check if email exists in login data table, then check password with bcrypt
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
})

/*
The below route should be:
/users/:userId/posts
We want to find a specific user and then find the child component to that user which will be posts

If we wanted to delete a post from the user:
DELETE /users/:userId/posts/:postId

Or update a post from the user:
UPDATE /users/:userId/posts/:postId 
*/
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

app.put('/posts/:id/update', (req, res) => {
    const {postID, text, userID} = req.body;
    db.transaction(tx => {
        tx('posts')
            .where({id: postID})
            .update({post: text})
            .returning("*")
            .then(updatedPost => {
                console.log(updatedPost)
                return tx('users')
                    .where({id: userID})
                    .returning("*")
                    .then(foundUser => {
                        console.log(foundUser)
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
})


app.listen(3000, () => console.log('Server starting at Port 3000'));