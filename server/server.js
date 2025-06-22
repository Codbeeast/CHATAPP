import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import cookieParser from 'cookie-parser'
import { connectDB } from './db/connection1Db.js'
import cors from 'cors'
import errorHandlerMiddleware from './middlewares/errorMiddleware.js'

import bcrypt from 'bcryptjs'
import userRouter from './routes/userRoutes.js'
import messageRouter from './routes/messageRoute.js'
import {io,app,server} from './socket.js'

connectDB()
app.use(cors(
    { origin: ['http://localhost:5173',process.env.URL], credentials: true }  //for react app to communicate with this server

))
app.use(cookieParser())
app.use(express.json())
app.use('/user',userRouter)
app.use('/message',messageRouter)
app.use(errorHandlerMiddleware)
// app.use('/user',userRouter)
app.get('/',(req,res)=>{
    res.send("hello")
})
const PORT=process.env.PORT || 3000
server.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})
