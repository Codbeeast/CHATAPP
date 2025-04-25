import express from 'express'
import { getMess, sendMess } from '../controller/messageController.js'

import { isAuthenticated } from '../middlewares/authMiddleware.js'


const router=express.Router()
router.post('/send/:receiverId',isAuthenticated,sendMess)
router.get('/getmessages/:itsId',isAuthenticated,getMess)

export default router