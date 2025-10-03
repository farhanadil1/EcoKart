import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Order } from '../models/order.models.js'
import { User } from '../models/user.model.js'
import { Product } from '../models/product.models.js'
import { Cart } from '../models/cart.models.js'
import Razorpay from 'razorpay'



//Razorpay Order (frontend payment initiation)
const createRazorpayOrder = asyncHandler(async (req, res) => {
    const { amount } = req.body;

    if (!amount) throw new ApiError(400, 'Amount is required')

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    try {
        const order = await razorpay.orders.create({
            amount: amount * 100, // in paise
            currency: 'INR',
            receipt: `rcptid_${Date.now()}`,
        });

        return res
            .status(200)
            .json(new ApiResponse(200, order, 'Razorpay order created'))
    } catch (error) {
        throw new ApiError(500, 'Error creating Razorpay order')
    }
})

//Create new order
const createOrder = asyncHandler(async (req, res) => {
    const { shippingDetails, paymentId, razorpayOrderId } = req.body

    if (!paymentId || !shippingDetails) {
        throw new ApiError(400, 'Payment and shipping details are required')
    }

    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product')

    if (!cart || !cart.items || cart.items.length === 0) {
        throw new ApiError(400, 'Cart is empty')
    }

    const totalPrice = cart.items.reduce(
        (acc, item) => acc + item.quantity * item.product.price,
        0
    )

    const order = await Order.create({
        user: req.user._id,
        orderItems: cart.items.map(item => ({
            product: item.product._id,
            name: item.product.name,
            image: item.product.imageUrl,
            quantity: item.quantity,
            price: item.product.price
        })),
        shippingDetails,
        totalPrice,
        paymentId,
        razorpayOrderId,
        orderStatus: 'Pending',
        paymentStatus: 'Paid',
    })

    // Clear user's cart
    cart.items = [];
    await cart.save({ validateBeforeSave: false })

    return res
    .status(201)
    .json(
        new ApiResponse(201, order, 'Order created successfully')
    )
})

//Get Orders of Logged in User
const getUserOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 })
    return res
    .status(200)
    .json(
        new ApiResponse(200, orders, 'Orders fetched successfully')
    )
})

//Get All Orders (Admin)
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({})
        .populate('user', 'fullName email')
        .sort({ createdAt: -1 })
    return res.status(200).json(new ApiResponse(200, orders, 'All orders fetched successfully'))
})

//Update Order Status (Admin)
const updateOrderStatus = asyncHandler(async (req, res) => {
    const { orderId, status } = req.body

    if (!orderId || !status) {
        throw new ApiError(400, 'Order ID and status are required')
    }

    const order = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
    );

    if (!order) throw new ApiError(404, 'Order not found')

    return res
        .status(200)
        .json(new ApiResponse(200, order, 'Order status updated successfully'))
})

export {
    createRazorpayOrder,
    createOrder,
    getUserOrders,
    getAllOrders,
    updateOrderStatus,
}