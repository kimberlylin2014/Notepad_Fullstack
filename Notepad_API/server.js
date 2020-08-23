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
    console.log('signing in')
    console.log(req.body);
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    // check if email exists in login data table
    db('login').where({email: email})
        .select("*")
        .then(user => {
            const isValid = bcrypt.compareSync(password, user[0].hash);
            if(isValid) {
                db('users').where({email: email})
                    .select('*')
                    .then(user => {
                        res.json(user[0])
                    })
                    .catch(err => res.status(400).json('unable to send user'))
            } else {
                res.status(400).json("Password incorrect")
            }
        })
        .catch(err => res.status(400).json('Email does not exist'))
    
    // check if email and password exists in database, if yes, send user as response
    // const {email, password } = req.body;
    // db.select("*").from ("login")
    //     .where({email:  email})
    //     .then(data => {
    //         const isValid = bcrypt.compareSync(password, data[0].hash)
    //         if(isValid) {
    //             return db.select("*").from("users")
    //                 .where({email: email})
    //                 .then(user => {
    //                     res.json(user[0])
    //                 })
    //                 .catch(err => res.status(400).json("unable to find user"))
    //         }
    //     })
    //     .catch(err => res.status(400).json('wrong credentials'))
})

app.listen(3000, () => console.log('Server starting at Port 3000'));