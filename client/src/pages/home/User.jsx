import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUsers } from '../../store/slice/user/userslice'

const User = ({ user }) => {
    const dispatch = useDispatch()
    const { selectedUsers } = useSelector(state => state.userReducer)
    const { messages } = useSelector(state => state.messageReducer)
     const {onlineUsers}= useSelector(state=>state.socketReducer)
    const userIsOnline = Array.isArray(onlineUsers) && onlineUsers.includes(user?._id);

//    const userIsOnline=onlineUsers.includes(user?._id)
//    console.log("🔹 Current User ID:", user?._id);
//    console.log("🔹 Online Users from Redux:", onlineUsers);
//    console.log("🔹 Is User Online?", userIsOnline);
    const handleClick = async () => {
        dispatch(setSelectedUsers(user))
    }
    return (
        <div onClick={handleClick} className={`flex items-center gap-4  hover:bg-gray-600 rounded-2xl p-3 cursor-pointer ${user?._id === selectedUsers?._id && 'bg-gray-700'}`} >
            <div className={`${userIsOnline && 'avatar avatar-online'}`}>
                <div className="w-14 rounded-full">
                    <img src= {user?.avatar} />
                </div>
            </div>
            <div>
                <h2 className='line-clamp-1 text-xl'>{user?.fullName}</h2>

                {Array.isArray(messages) && messages.length > 0 && (
                    <p className="text-sm text-gray-400">
                        {messages
                            .filter((msg) => String(msg?.receiverId) === String(user?._id)) // Ensure proper matching
                            .slice(-1) // Show only the last message
                            .map((msg) => (
                                <span key={msg?._id}></span>
                            ))}
                    </p>
                )}


            </div>

        </div>
    )
}

export default User
