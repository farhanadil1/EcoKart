import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Product } from '../models/product.models.js';
import { uploadToCloudinary } from '../utils/cloudinary.js'

const getAllProducts = asyncHandler(async (req, res) => {
  const { search } = req.query;
    let query = {};

    if (search) {
        // Split search phrase into tokens 
        const tokens = search
        .trim()
        .split(/\s+/)
        .filter(Boolean);

        // Build query: each token must match at least one of these fields
        query = {
        $and: tokens.map((token) => ({
            $or: [
            { name: { $regex: token, $options: "i" } },
            { category: { $regex: token, $options: "i" } },
            { shortDescription: { $regex: token, $options: "i" } },
            { longDescription: { $regex: token, $options: "i" } },
            { "specification.netQuantity": { $regex: token, $options: "i" } },
            { "specification.shelfLife": { $regex: token, $options: "i" } },
            { "specification.countryOfOrigin": { $regex: token, $options: "i" } },
            { "specification.usageInstructions": { $regex: token, $options: "i" } },
            ],
        })),
        };
    }

    const products = await Product.find(query);
    return res
        .status(200)
        .json(
        new ApiResponse(200, products, "Products fetched successfully")
        );
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