import { Router } from "express";
import { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/product.controllers.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

//public routes
router.route('/').get(getAllProducts)
router.route('/:id').get(getProductById)

//protected Admin routes
router.route('/create').post(verifyJWT, upload.single('image'), createProduct)
router.route('/:id').put(verifyJWT, updateProduct)
router.route('/:id').delete(verifyJWT, deleteProduct)

//app.use('/api/products', productRouter)

export default router
