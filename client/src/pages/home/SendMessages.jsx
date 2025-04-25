import React, { useState } from 'react'
import { IoIosSend } from "react-icons/io"
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk } from '../../store/slice/message/messageThunk';
const SendMessages = () => {
    const {selectedUsers}=useSelector(state=>state.userReducer)
    
  const[message,setMessage]= useState("")
  const dispatch=useDispatch()
  const onSend=()=>{
    // console.log(selectedUsers?._id,message)
    dispatch(sendMessageThunk({receiverId:selectedUsers?._id,message})
)
setMessage("")
}
  return (
    
        <div className='w-full p-3 flex gap-2 '>
                              <input
                                value={message}
                                onKeyPress={(e)=>{
                                  if(e.key === 'Enter'){
                                        onSend()
                                  }
                                }
                                  
                                }
                              onChange={(e)=>{
                                    setMessage(e.target.value)
    
                              }}
                                  type="text"
                                  placeholder="Type here..."
                                  className="input input-bordered input-primary w-full text-lg tracking-wide text-white " style={{ fontFamily: "Inter, sans-serif" }}  
                              />
                              <button onClick={onSend} className="btn  p-1 btn-circle btn-outline text-[100px]  hover:scale-110 bg-green-400 text-black border border-green-400 transition-all duration-400 ease-in-out  ">
                                  <IoIosSend />
                              </button>
                          </div>
    
  )
}

export default SendMessages
