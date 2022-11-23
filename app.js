const express = require("express");
const mongoose = require('mongoose');
const app = express();
const config = require("config");
const Users = require('./routes/users')
const Products =require('./routes/products')
const Carts = require('./routes/carts')
const Orders = require('./routes/orders')

require('./config/default.json')
app.use('/users',Users)
app.use('/products',Products)
app.use('/carts',Carts)
app.use('/orders',Orders)
app.use(express.json());

mongoose
    .connect(config.get('db'))
    .then(() => winston.info("connected to MongoDB..."))
    .catch((err) => console.log("Could not connect to MongoDB..."));

 if (!config.get("jwtPrivateKey")) {
        console.error("FATAL ERROR: jwtPrivateKey is not defined.");
        process.exit(1);
     }

const port = process.env.PORT || 3000;
app.listen(port,()=>console.info(`Listening on port ${port}...`));