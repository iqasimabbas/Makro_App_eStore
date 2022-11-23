const express = require("express");
const Cart = require("../models/cart");
const auth = require("../middleware/auth");
const router = express.Router();


// Adding product in Cart (or creating new cart)

router.post("/", auth, async (req, res) => {
const {productId, quantity} = req.body;

    let cart;

    const owner = req.user._id;
             //cheking if cart exists
     cart = await Cart.findOne({ owner });

   if(!cart) {
 cart = await Cart.create({
    owner,
    products : [{productId,quantity}]
 })}

 const productpresence = cart.products.findIndex((product) => product.productId == productId);
 //cheking if product exists
 if (productpresence > -1) {
    let product = cart.products[productpresence];
    product.quantity += quantity;
 } else {
    cart.products.push({ productId, name, quantity, price });
 }

await cart.save();
res.send(cart)
}
)


// Getting Cart
router.get("/cart", auth, async (req, res) => {

    const owner = req.user._id;
        const cart = await Cart.findOne({ owner });
    if (cart && cart.products.length > 0) {
         res.status(200).send(cart);
    } else {
          res.send('Add atleast One Product in Cart');
    }
    
    });


// deleting a Product from Cart

router.delete("/cart/:id", auth, async (req, res) => {
    const owner = req.user._id;

    let cart = await Cart.findOne({ owner });
    const productpresence = cart.products.findIndex((product) => product.productId == productId);
    if (productpresence > -1) {
        cart.products.splice(productpresence, 1);
        } else {
            res.status(404).send("Product with the given ID not found");
        }

res.send(cart)});

module.exports = router;