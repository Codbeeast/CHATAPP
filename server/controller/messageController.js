import {conversation} from "../model/conversationModel.js"
import {Message} from "../model/messageModel.js"
import { asyncHandler } from "../utilities/asyncHandler.js"
import { errorHandler } from "../utilities/errorHandler.js"
import {io,getSocketId} from './.././socket.js'


export const sendMess = asyncHandler(async(req, res, next) => {

    const senderId=req.user._id
    const receiverId=req.params.receiverId
    const message= req.body.message
    
   
   
    if (!senderId ||!message ||!receiverId) {
       return next(new errorHandler('All fields are required',400))

    }
    let convo = await conversation.findOne(
        { participants: { $all: [senderId, receiverId] } }
    )
    if (!convo) {
        convo = await conversation.create({
            participants: [senderId, receiverId]
        })
    }
    const newMessage = await Message.create({
    
        senderId,
        receiverId,
        message
    })
    if(newMessage){
    convo.messages.push(newMessage._id)
    await convo.save()
    }
    const socketId=getSocketId(receiverId)
  
    io.to(socketId).emit("mess",newMessage)
    res.status(200).json({
        success: true,
        responseData:{
            newMessage
            
        }
    })

  

}
)

export const getMess = asyncHandler(async(req, res, next) => {

    const myId=req.user._id
    const itsId=req.params.itsId
   
   
  
    if (!myId ||!itsId) {
       return next(new errorHandler('All fields are required',400))

    }
    let convo = await conversation.findOne(
        { participants: { $all: [myId,itsId] } }
    ).populate("messages")
    
 
    res.status(200).json({
        success: true,
        responseData:{
            convo
            
        }
    })

  

}
)
