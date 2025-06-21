import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import User from './User';
import Message from './Message';
import { getMessageThunk } from '../../store/slice/message/messageThunk';
import SendMessages from './SendMessages';

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedUsers } = useSelector(state => state.userReducer);
  const { messages } = useSelector(state => state.messageReducer);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (selectedUsers?._id) {
      dispatch(getMessageThunk({ receiverId: selectedUsers?._id }));
    }
  }, [selectedUsers]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {(!selectedUsers || Object.keys(selectedUsers).length === 0) ? (
        <div className='flex items-center justify-center w-full h-screen'>
          <p className="text-center text-gray-400 text-4xl">Start Chatting....</p>
        </div>
      ) : (
        <div className="h-screen w-full flex flex-col bg-gray-800">
          <div className="p-3 border-b border-white/10">
            <User user={selectedUsers} />
          </div>
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto py-3 px-2 space-y-2">
            {messages?.length > 0 ? (
              messages.map((msg, index) => <Message key={index} messageDetails={msg} />)
            ) : (
              <p className="text-center text-gray-400">No messages yet</p>
            )}
          </div>
          <SendMessages />
        </div>
      )}
    </>
  );
};

export default MessageContainer;
