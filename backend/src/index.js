import dotenv from 'dotenv'
import connectDB from './db/index.js'
import {app} from './app.js'

console.log(process.env.MONGODB_URI);

dotenv.config({
    path: './.env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT || 8000}`)
    })
})
.catch((error) => {
    console.log('Failed to connect to databse!!!!!', error)
})