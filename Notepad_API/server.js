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

app.listen(3000, () => console.log('Server starting at Port 3000'));