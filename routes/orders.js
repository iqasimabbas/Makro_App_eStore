const express = require('express')
const router = express.Router();
const auth = require ('../middleware/auth');


//getting order of logged in user
router.get('/', auth, async (req, res) => {
    const owner = req.user._id;
    const order = await Order.find({ owner: owner });
    res.status(200).send(order)
    })
module.exports =router;