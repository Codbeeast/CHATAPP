import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from "framer-motion";

const Message = ({ messageDetails }) => {
  const { userProfile } = useSelector(state => state.userReducer);
  const { selectedUsers } = useSelector(state => state.userReducer);
  
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}  // Starts faded out & slightly down
        animate={{ opacity: 1, y: 0 }}  // Moves up & fades in
        transition={{ duration: 0.4, ease: "easeOut" }}  // Smooth effect
        className={`chat ${userProfile?.profile?._id === messageDetails?.senderId ? "chat-end" : "chat-start"}`}
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Chat Avatar"
              src={(userProfile?.profile?._id === messageDetails?.senderId) ? userProfile?.profile?.avatar : selectedUsers?.avatar}
            />
          </div>
        </div>
        <div className="chat-header">
        <time className="text-xs opacity-50">{formatTime(messageDetails?.createdAt)}</time>
        </div>
        <div className="chat-bubble text-lg tracking-wide font-semibold bg-white text-black" style={{ fontFamily: "Inter, sans-serif" }}>
  {messageDetails?.message}
</div>


      </motion.div>
    </div>
  );
};


export default Message
