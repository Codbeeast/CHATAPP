import React, { useState } from 'react'
import { IoIosSend } from "react-icons/io"
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk } from '../../store/slice/message/messageThunk';
const SendMessages = () => {
    const {selectedUsers}=useSelector(state=>state.userReducer)
    
  const[message,setMessage]= useState("")
  const dispatch=useDispatch()
  const onSend=()=>{
    dispatch(sendMessageThunk({receiverId:selectedUsers?._id,message})
)
setMessage("")
}
  return (
    
        <div className="w-full p-3 flex gap-2 items-center">
  <input
    value={message}
    onKeyPress={(e) => e.key === 'Enter' && onSend()}
    onChange={(e) => setMessage(e.target.value)}
    type="text"
    placeholder="Type here..."
    className="input input-bordered w-full ml-5 sm:ml-8 lg:ml-0 md:ml-0  text-sm sm:text-base text-white bg-gray-800"
  />
  <button
    onClick={onSend}
    className="btn btn-circle bg-green-400 text-black hover:scale-110 transition-transform"
  >
    <IoIosSend size={22} />
  </button>
</div>


  )
}

export default SendMessages
