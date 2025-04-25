import express from 'express'
import {login} from '../controller/userController.js'
import {register} from '../controller/userController.js'
import {getProfile} from '../controller/userController.js'
import { isAuthenticated } from '../middlewares/authMiddleware.js'
import { logout } from '../controller/userController.js'

import { getOtherUsers } from '../controller/userController.js'
const router=express.Router()
router.post('/login',login)
router.post('/register',register)
router.get('/getprofile',isAuthenticated,getProfile)
 router.get('/getOthers',isAuthenticated, getOtherUsers)  //update profile route
router.post('/logout',isAuthenticated,logout)
export default router   