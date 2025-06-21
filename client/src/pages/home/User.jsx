import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUsers } from '../../store/slice/user/userslice'
import {boy,girl} from '../../url/ImageUrl'
const User = ({ user }) => {
    const dispatch = useDispatch()
    const { selectedUsers } = useSelector(state => state.userReducer)
    const { messages } = useSelector(state => state.messageReducer)
    const { onlineUsers } = useSelector(state => state.socketReducer)
    const userIsOnline = Array.isArray(onlineUsers) && onlineUsers.includes(user?._id);

    const url=user?.gender=='male'?boy:girl
    const handleClick = async () => {
        dispatch(setSelectedUsers(user))
    }
    return (
        <div onClick={handleClick} className={`flex ml-5 sm:ml-8 lg:ml-0 md:ml-0  items-center gap-3 sm:gap-4 p-3 rounded-xl cursor-pointer hover:bg-gray-600 ${user?._id === selectedUsers?._id ? 'bg-gray-700' : ''}`}>
            <div className={`avatar ${userIsOnline ? 'avatar-online' : ''}`}>
                <div className="w-10 sm:w-14 rounded-full">
                    <img src={url} />
                </div>
            </div>
            <div className="flex flex-col">
                <h2 className="text-sm sm:text-lg font-semibold truncate">{user?.fullName}</h2>
                <p className="text-xs sm:text-sm text-gray-400 truncate">
                    {messages?.filter((msg) => String(msg?.receiverId) === String(user?._id)).slice(-1).map((msg) => (<span key={msg?._id}></span>))}
                </p>
            </div>
        </div>
    )
}

export default User
