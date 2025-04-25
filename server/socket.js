import {Server} from 'socket.io'
import express from 'express'
import http from 'http' 
// import { useResolvedPath } from 'react-router-dom';
const app=express()
const server = http.createServer(app);
const io = new Server(server, {cors:{ origin: 'http://localhost:5173', credentials: true }});

const usersocketMap={

}
io.on("connection",(socket)=>{
    const userId=socket.handshake.query.userId
    // console.log(userId)
    if(!userId)return
    usersocketMap[userId]=socket.id   
  
    io.emit("onlineUsers", Object.keys(usersocketMap))
    socket.on('disconnect',()=>{
        delete usersocketMap[userId]
        io.emit("onlineUsers", Object.keys(usersocketMap))

    })
})

const getSocketId=(userId)=>{
    return usersocketMap[userId]
}
export {io,server,app,getSocketId}