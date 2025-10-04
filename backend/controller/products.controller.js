import { AppError } from '../utils/errorHandler.js';
import Product from '../model/Products.js';

export async function getProducts(req, res, next) {
    try {
        const items = (await Product.find({})).sort({ createdAt: -1 }); // retrieve from the newest data (recently added)
        if (!items) return next(new AppError(404, 'Products not found'));
        
        res.status(200).json({success: true, count: items.length, data: items});
    } 
    catch (error) {
        next(error);
    }
}

export async function createProduct(req, res, next) {
    const { productName, price, img } = req.body; // user will send the request data to the backend server inside the body property in JSON

    if (!productName || !price || !img) {
        return next(new AppError(400, 'Please provide all required fields'));
    }

    // Price validation
    if (isNaN(price) || price <= 0) {
        return next(new AppError(400, 'Price must be a positive number'));
    }

    try {
        const newProduct = await Product.create({
            productName, price: Number(price), img
        });

        res.status(201).json({success: true, data: newProduct});

    } catch (error) {
        next(error)
    }
}

export async function updateProduct(req, res, next) {
    const { id } = req.params;
    const product = req.body;

    try {
        const productToUpdate = await Product.findByIdAndUpdate(id, product, {new: true});
        if (!productToUpdate) return next(new AppError(404, 'No product found with an id of' + id));

        res.status(201).json({success: true, message: 'Product updated successfully!', data: productToUpdate})
    } catch (error) {   
        next(error);
    }
}

export async function deleteProduct(req, res, next) {
    const { id } = req.params;
    
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return next(new AppError(404, 'Product not found'));

        res.status(201).json({sucess: true, message: 'Product deleted successfully!'});

    } catch (error) {   
        next(error);
    }
}
