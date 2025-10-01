import express from 'express';
import dotenv from 'dotenv';
import { dbConnection } from './config/database.js';
import Product from './model/Products.js';

dotenv.config();
const app = express();

app.use(express.json()); // lets us use JSON response from the request body
app.post('/api/products', async (req, res) => {
    const product = req.body; // user will send the request data to the backend server inside the body property in JSON

    if (!product.productName || !product.price || !product.img) {
        return res.status(400).json({
            success: false,
            message: `Please provide a value to all fields required to create a product`
        });
    }

    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});

    } catch (e) {
        console.error(`Error creating product: ${e.message}`);
        res.status(500).json({succes: false, message: `Server error occurred`});
    }
});

app.listen(5000, () => {
    dbConnection();
    console.log('Server started at https://localhost:5000')
})