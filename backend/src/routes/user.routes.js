import {Router} from 'express'
import { registerUser, loginUser,logoutUser, Auth, getAllUsers } from '../controllers/user.controllers.js'
import {verifyJWT} from '../middlewares/auth.middleware.js'

const router = Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').post(verifyJWT,logoutUser)
router.route('/auth').post(verifyJWT,Auth)
//Admin 
router.route('/get-all-users').get(verifyJWT, getAllUsers)

export default router