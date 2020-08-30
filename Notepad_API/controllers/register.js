const handleRegister = (req, res, db, bcrypt) => { 
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
                        console.log("registered new user")
                        console.log(user)
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