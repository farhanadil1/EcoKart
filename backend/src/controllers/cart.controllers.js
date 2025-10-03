import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Cart } from '../models/cart.models.js'
import { Product } from '../models/product.models.js'

const getCartByUserId = asyncHandler( async (req, res) => {
    const cart = await Cart.findOne({ user: req.user._id}).populate('items.product')
    if(!cart){
        throw new ApiError(404, 'Cart not found!')
    }
    return res
    .status(200)
    .json(new ApiResponse(200, cart, 'Cart fetched successfully.'));
})

const addToCart = asyncHandler( async (req, res) => {
    const { productId, quantity } = req.body
    const product = await Product.findById(productId)
    if(!product){
        throw new ApiError(404, 'Product not found!')
    }
    let cart = await Cart.findOne({user: req.user._id})
    if(!cart){
        cart = new Cart({user: req.user._id, items:[]})
    }
    const existingItem = cart.items.find(item => item.product.toString() === productId)
    if(existingItem){
        existingItem.quantity += quantity
    } else {
        cart.items.push({ product: productId, quantity})
    }

    await cart.save()
    await cart.populate('items.product')
    return res
    .status(200)
    .json(
        new ApiResponse(200, cart, 'Product added to cart successfully')
    )
})

const increaseQuantity = asyncHandler( async (req, res) => {
    const {productId} = req.params
    const cart = await Cart.findOne({user: req.user._id})
    if(!cart){
        throw new ApiError(404, 'Cart not found!')
    }
    const item = cart.items.find(item => item.product.toString() === productId)
    if(!item){
        throw new ApiError(404, 'Product not found in cart')
    }
    item.quantity +=1

    await cart.save()
    await cart.populate('items.product')
    return res
    .status(200)
    .json(
        new ApiResponse(200, cart, 'Quanity increased successfully')
    )
})

const decreaseQuantity = asyncHandler( async (req, res) => {
    const {productId} = req.params
    const cart = await Cart.findOne({user: req.user._id})
    if(!cart){
        throw new ApiError(404, 'Cart not found!')
    }
    const itemIndex = cart.items.findIndex(item => item.product.toString() === productId)
    if (itemIndex === -1) throw new ApiError(404, 'Product not found in cart')

    const item = cart.items[itemIndex]

    if (item.quantity > 1) {
        item.quantity -= 1
    } else {
        cart.items.splice(itemIndex, 1)
    }

    await cart.save();
    await cart.populate('items.product');

    return res
    .status(200)
    .json(
        new ApiResponse(200, cart, 'Product quantity decreased')
    )
})

const removeFromCart = asyncHandler( async (req, res) => {
    const {productId} = req.params
    const cart = await Cart.findOne({ user: req.user._id })
    if(!cart){
        throw new ApiError(404, 'Cart not found!')
    }
    const originalLength = cart.items.Length
    cart.items = cart.items.filter(item => item.product.toString() !== productId)
    if(cart.items.length === originalLength){
        throw new ApiError(404, 'Product not found in cart')
    }

    await cart.save()
    await cart.populate('items.product')

    return res
    .status(200)
    .json(
        new ApiResponse(200, cart, 'Product removed from cart successfully')
    )
})

export {
    getCartByUserId,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart
}