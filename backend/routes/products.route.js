import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from "../controller/products.controller.js";

const router = express.Router();
/*
** Call all functions from the controller file '../controller/products.controller.js'
*/
router.get('/', getProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;