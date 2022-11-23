const express = require('express')
const Product = require('../models/product')
const router = express.Router();
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')


// Adding new Product
router.post('/',auth, async(req,res)=>{

    let product = new Product({
                ...req.body,
                owner:req.user._id
    });
     await product.save();
    res.send(product);
   })

// getting a product
     router.get('/:id', async(req, res) => {

        const product = await Product.findOne({_id: req.params.id})
        res.send(product);
    })


// getting all products
router.get('/', async(req, res) => {

    const products = await Product.find({})
    res.send(products);
   })


// updating a product
 router.put('/:id',[auth, admin], async(req,res)=>{ 
    const product = await Product.findByIdAndUpdate(
        req.params.id, {name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price })
})

//deleting a product
    router.delete('/:id', [auth, admin], async(req, res) => {
    const deletedProduct = await Product.findOneAndDelete( {_id: req.params.id} )
       if(!deletedProduct) {
        res.status(404).send({error: "Product not found"})
    }
       res.send(deletedProduct)
    })


    
    module.exports = router;