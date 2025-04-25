import React,{useEffect} from 'react'
import Login from './../authentication/Login';
import UserSidebar from './UserSidebar';
import MessageContainer from './MessageContainer';
import io from 'socket.io-client'
import { useDispatch, useSelector } from 'react-redux';
import { initializeSocket } from '../../store/slice/socket/socketSlice';

import { setOnlineUsers } from '../../store/slice/socket/socketSlice';
import { setNewMess } from '../../store/slice/message/messageSlice';



const Home = () => {
  const dispatch= useDispatch()
  const {isAuthenticated,userProfile,buttonloading}= useSelector(state=>state.userReducer)
  const {socket,onlineUsers}= useSelector(state=>state.socketReducer)
  // console.log("socket", socket)
  // console.log()
  useEffect(()=>{
     if(!socket) return
    socket.on('onlineUsers',(onlineUsers)=>{
     dispatch(setOnlineUsers(onlineUsers))

    })
    socket.on('mess',(newMessage)=>{
      // console.log("new message",newMessage)
      
      dispatch(setNewMess(newMessage))})
    return()=>{
      socket.close()
    }
  },[socket])
  useEffect(()=>{
    
    if(!isAuthenticated ||!userProfile?.profile?._id)return
    // console.log('i am ahero')
    // console.log("Profile:",userProfile?.profile?._id)
    dispatch(initializeSocket(userProfile?.profile?._id))
  },[isAuthenticated,userProfile])
  return (
    <div className='flex'>
      <UserSidebar/>
      <MessageContainer/>
      
             

    </div>
  )
}

export default Home
