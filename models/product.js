const mongoose = require('mongoose')
const ObjectID = mongoose.Schema.Types.ObjectId

const prodSchema = new mongoose.Schema({
    owner : {
       type: ObjectID,
       required: true,
       ref: 'User'
    },
    name: {
       type: String,
       required: true,
    },
    
    description: {
      type: String,
      required: true
    },
    category: {
       type: String,
       required: true, 
       trim: true
    },
    price: {
       type: Number,
       required: true,
       min:1
    }
    }
    )

    const Product = mongoose.model('Product', prodSchema)
module.exports = Product