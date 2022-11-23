const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const cartSchema = new mongoose.Schema({
    owner : {
      type: ObjectID,
       required: true,
       ref: 'User'
     },

    name: String,
    price: Number,
    
    products: [{
      productId: {
       type: ObjectID,
       ref: 'Product',
       required: true
    },
    quantity: {
       type: Number,
       required: true},
     }]
    })

    const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart