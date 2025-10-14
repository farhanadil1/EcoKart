import express from 'express'
import cors from 'cors'
import multer from 'multer'
import cookieParser from 'cookie-parser'

const app = express()

app.use(cors({
    origin: ['http://localhost:3000', 'https://ecokart-adil-farhan.netlify.app', 'https://ecokart-adil-farhan.onrender.com'],
    credentials: true
}))

app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(cookieParser())


import userRouter from './routes/user.routes.js'
import productRouter from './routes/product.routes.js'
import cartRouter from './routes/cart.routes.js'
import orderRouter from './routes/order.routes.js'
//http://localhost:8000/api/users/
app.use('/api/users', userRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/orders', orderRouter)


import { errorHandler } from './middlewares/errorHandler.middleware.js'
app.use(errorHandler)

export {app}