const handleSignIn = (req, res, db, bcrypt) => {
    const { email, password } = req.body;
    db('login')
        .where({email: email})
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
}

module.exports = {
    handleSignIn: handleSignIn
}