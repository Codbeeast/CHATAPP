import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from "framer-motion";
import {boy,girl} from '../../url/ImageUrl'


const Message = ({ messageDetails }) => {
  const { userProfile } = useSelector(state => state.userReducer);
  const { selectedUsers } = useSelector(state => state.userReducer);
  const url=userProfile?.profile?.gender=='male'?boy:girl
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };
  return (
    <div>
     <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
  className={`chat ${userProfile?.profile?._id === messageDetails?.senderId ? "chat-end" : "chat-start"}`}
>
  <div className="chat-image avatar">
    <div className="w-8 sm:w-10 rounded-full">
      <img alt="Chat Avatar" src={url} />
    </div>
  </div>
  <div className="chat-header text-xs">
    <time className="opacity-50">{formatTime(messageDetails?.createdAt)}</time>
  </div>
  <div className="chat-bubble text-sm sm:text-base font-medium bg-white text-black">
    {messageDetails?.message}
  </div>
</motion.div>

    </div>
  );
};


export default Message
