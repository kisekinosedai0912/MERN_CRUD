import { AppError } from '../utils/errorHandler.js';
import Product from '../model/Products.js';

export async function getProducts(req, res, next) {
    try {
        const items = await Product.find({});
        if (!items) return next(new AppError(404, 'Products not found'));
        
        res.status(201).json({success: true, data: items});
    } 
    catch (error) {
        next(error);
    }
}

export async function createProduct(req, res, next) {
    const product = req.body; // user will send the request data to the backend server inside the body property in JSON

    if (!product.productName || !product.price || !product.img) {
        return next(new AppError(400, 'Please provide all required fields'));
    }

    const newProduct = new Product(product);
    try {
        await newProduct.save();
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
