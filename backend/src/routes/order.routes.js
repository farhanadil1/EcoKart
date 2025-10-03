import Router from 'express'
import { createRazorpayOrder, createOrder, getAllOrders, getUserOrders, updateOrderStatus } from '../controllers/order.controllers.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
 
const router = Router()

router.route('/razorpay').post(verifyJWT, createRazorpayOrder)
router.route('/create').post(verifyJWT, createOrder)
router.route('/my-orders').get(verifyJWT, getUserOrders)
//Admin Routes --------
router.route('/get-all').get(verifyJWT, getAllOrders)
router.route('/status').put(verifyJWT, updateOrderStatus)




export default router