import {User} from '../models/user.model.js';
import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'

const GenerateAccessAndRefreshToken = async (userId) => {
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})
        return {accessToken, refreshToken}
    }
    catch(error){
        throw new ApiError(500, "Something went wrong")
    }
}

const registerUser = asyncHandler( async(req, res) => {

    const {username, email, fullName, password} =req.body

    if(
        [username, email, fullName, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, 'All Fields are Required')
    }

    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(password)) {
        throw new ApiError(
        400,
        "Password must be at least 8 characters long and contain at least one special character."
        );
    }

    const userExists = await User.findOne({
            $or:[
                {username: username},
                {email: email}
            ]
    })
    if(userExists){
        throw new ApiError(409, 'User already exists. Try to Login')
    }

    const user = await User.create({
        username,
        email,
        fullName,
        password
    })

    const userCreated = await User.findById(user._id).select(
        '-password -refreshToken'
    )

    if(!userCreated){
        throw new ApiError(500, 'Something went wrong, please try again later.')
    }

    return res.status(201).json(
        new ApiResponse(201, userCreated, 'User registered successfully')
    )
})

const loginUser = asyncHandler( async(req, res) => {

    const {username, email, password} = req.body

    if(!(username || email)){
        throw new ApiError(400, 'Username or Email is required to Login')
    }

    const user = await User.findOne({
        $or: [
            {username: username},
            {email: email}
        ]
    })

    if(!user){
        throw new ApiError(404, 'User not found. Please register first')
    }

    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched){
        throw new ApiError(401, 'Invalid Credentials')
    }

    const {accessToken, refreshToken} = await GenerateAccessAndRefreshToken(user._id)

    const userLoggedIn = await User.findById(user._id).select('-password -refreshToken')

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        path: '/',

    }

    return res
    .status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: userLoggedIn,
                accessToken,
                refreshToken
            },
            'User Logged in Successfully'
        )
    )
})

const logoutUser = asyncHandler( async(req,res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {refreshToken: null}
        },
        {
            new: true
        }
    )
    const options ={
        httpOnly: true,
        secure: true
    }
    return res
    .status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json(
        new ApiResponse(200,{}, 'User Logged out Successfully')
    )
})

const Auth = asyncHandler( async(req,res) => {
    return res
    .status(200)
    .json(
        new ApiResponse(200, {}, 'User is LoggedIn')
    )
})

const getAllUsers = asyncHandler ( async(req, res) => {
    const users = await User.find({})
    if(!users){
        throw ApiError(404, 'Failed to fetch Users!')
    }
    return res
    .status(200)
    .json(
        new ApiResponse(200, users, 'Users Fetched Successfully.')
    )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    Auth,
    getAllUsers
}