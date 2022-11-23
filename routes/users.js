const express = require('express')
const User = require('../models/user')
const router = express.Router();

//registering a user

router.post('/register', async (req,res)=>{

    let user = await User.findOne({ email: req.body.email});
    if (user) return res.status(400).send('User already registered.');
      
user = new User ({
    name: req.body.name,
    email:req.body.email,
    password:req.body.password
})

const token = user.generateAuthToken();
res.header('x-auth-token', token).send(_.pick(user, ['_id','name', 'email']))

});


//loging in a user

router.post('/login', async (req, res) => {
      const user = await User.findByCredentials(req.body.email, req.body.password)
      const token = await user.generateAuthToken()
      res.send({ user, token})
})

module.exports = router;