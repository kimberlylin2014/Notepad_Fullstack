const { validationResult } = require("express-validator");

const handleRegister = (req, res, db, bcrypt, validationResult) => {
    const errors = validationResult(req); 
    if(!errors.isEmpty()) {
        console.log('found errors')
        return res.status(400).json('Check Form Requirements')
    }
    console.log("no validation errors")
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
                    .returning('*')
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
}

module.exports = {
    handleRegister: handleRegister
}