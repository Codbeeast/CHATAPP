import React, { useEffect, useRef } from 'react';
import User from './User';
import Message from './Message';
import { useDispatch, useSelector } from 'react-redux';
import { getMessageThunk } from '../../store/slice/message/messageThunk';
import SendMessages from './SendMessages';

const MessageContainer = () => {
    const dispatch = useDispatch();
    const { selectedUsers } = useSelector(state => state.userReducer);
    const { messages } = useSelector(state => state.messageReducer);
    
    // Reference to the scrollable div
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        if (selectedUsers?._id) {
            dispatch(getMessageThunk({ receiverId: selectedUsers?._id }));
        }
    }, [selectedUsers]);

    // Function to scroll to bottom
    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    // Scroll when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <>
            {(!selectedUsers || Object.keys(selectedUsers).length === 0) ? (
                <div className='flex items-center justify-center w-full'>
                <p className="text-center text-gray-400 text-4xl">Start Chatting....</p>
                </div>
            ) : (
                <div className="h-screen w-full flex flex-col">
                    <div className="p-3 border-b border-b-white/10">
                        <User user={selectedUsers} />
                    </div>
                    {/* Scrollable message container */}
                    <div 
                        className="flex flex-grow overflow-y-auto py-3 flex-col"
                        ref={messagesContainerRef} // Attach the ref to this div
                    >
                        {messages?.length > 0 ? (
                            messages.map((msg, index) => (
                                <Message key={index} messageDetails={msg} />
                            ))
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
