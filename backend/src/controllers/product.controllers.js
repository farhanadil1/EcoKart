import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Product } from '../models/product.models.js';
import { uploadToCloudinary } from '../utils/cloudinary.js'

const getAllProducts = asyncHandler( async (req, res) => {
    const products = await Product.find({})
    return res
    .status(200)
    .json(
        new ApiResponse(200, products, 'All products fetched succesfully')
    )
})

const getProductById = asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(!product){
        throw new ApiError(404, 'Product not found')
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, product, 'Product fetched succesfully')
    )
})


const createProduct = asyncHandler( async (req, res) => {

    if (!req.body.name || !req.body.price || !req.body.category) {
        return res
        .status(400)
        .json({ message: 'Products details are required' })
    }
    let imageUrl = null;

    if (req.file) {
        // Upload local file to Cloudinary
        imageUrl = await uploadToCloudinary(req.file.path)
    }
    const productData = {
        ...req.body,
        imageUrl
    };

    const product = await Product.create(productData)
    return res
    .status(201)
    .json(
        new ApiResponse(201,product, 'Product created successfully ')
    ) 
})

const updateProduct = asyncHandler( async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    if(!product){
        throw new ApiError(404, 'Product not found')
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, product, 'Product Updated Sucessfully')
    )
})

const deleteProduct = asyncHandler( async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)
    if(!product){
        throw new ApiError(404, 'Product not found')
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, product, 'Product Deleted Successfully')
    )
})

export {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct, 
    deleteProduct
}