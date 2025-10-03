import { Router } from 'express'
import { 
    getCartByUserId, addToCart, increaseQuantity, decreaseQuantity, removeFromCart
} from '../controllers/cart.controllers.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
 
const router = Router()

router.route('/').get(verifyJWT, getCartByUserId)
router.route('/add/:productId').post(verifyJWT, addToCart)
router.route('/increase/product/:productId').put(verifyJWT, increaseQuantity)
router.route('/decrease/product/:productId').put(verifyJWT, decreaseQuantity)
router.route('/remove/product/:productId').delete(verifyJWT, removeFromCart)


export default router