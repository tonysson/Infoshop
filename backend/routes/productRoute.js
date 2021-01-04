import express from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct , createProductReview,getTopProducts } from '../controllers/productControllers.js';
import { protect , isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router()


router.route('/').get(getProducts).post(protect, isAdmin , createProduct);
router.get('/top', getTopProducts)
router.route('/:id/reviews').post( protect, createProductReview)
router.route('/:id').get(getProductById).delete(protect , isAdmin , deleteProduct).put(protect , isAdmin , updateProduct);



export default router;