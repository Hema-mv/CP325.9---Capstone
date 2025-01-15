import express from 'express';
//import { getAllProducts, createProduct, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import productController from '../../ecommerce-api/controllers/productController.mjs';



//import { protect } from '../controllers/authController.js';

const router = express.Router();

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;
