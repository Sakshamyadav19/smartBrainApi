const handleRegister=(req,res,db,bcrypt) => {
    const { name, email, password } = req.body;
    if(!email||!name||!password){
       return res.status(400).json('Incorrect form submission')
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        db.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                return db('users')
                    .returning('*')
                    .insert({
                        email: loginEmail[0],
                        name: name,
                        joined: new Date()
                    }).then(user => {
                        res.json(user[0]);
                    })
                    .catch(err =>{
                        console.log(err,"Failed to add user")
                    })
            })
            .then(trx.commit)
            .catch(err =>{
                console.log(err,"Failed to insert")
                trx.rollback
            })
    })
        .catch(err => {
            console.log(err,"Failed trx")
            res.status(400).json('Unable to register')})
}

module.exports={
    handleRegister:handleRegister
}