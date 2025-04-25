import React, { useEffect,useState } from "react";
import { IoSearch } from 'react-icons/io5'; // Correct import path
import User from "./User.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getOthersProfileThunk, logOutUserThunk } from "../../store/slice/user/useThunk.js";
import {  getProfileThunk } from '../../store/slice/user/useThunk';

const UserSidebar = () => {
    const dispatch = useDispatch()
    
    const{userProfile}= useSelector(state=>state.userReducer)
    const [searchTerm, setSearchTerm] = useState(""); // State for search input
    const {otherUsers}=useSelector((state)=>{
        return state.userReducer.otherUsers
    })
    
 // Filter users based on search input
 const filteredUsers = otherUsers?.filter((user) =>
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
);
    const handleLogOut=async()=>{
       await dispatch(logOutUserThunk())
    }
    useEffect(()=>{
        dispatch(getOthersProfileThunk())
        dispatch(getProfileThunk())
    },[])
    return (
        <div className="max-w-[18rem] w-full h-screen flex flex-col">
            <h1 className="bg-black text-white font-bold p-3">My ChatApp</h1>
            <div className="p-3 ">
                <label className="input focus-within:border-none transition-all flex items-center  gap-2">
                    <input type="text"   onChange={(e) => setSearchTerm(e.target.value)} className="grow text-lg text-white " style={{ fontFamily: "Inter, sans-serif" }} placeholder="Search" />
                    <IoSearch />
                </label>
            </div>
            <div id="overflow" className="h-full overflow-y-auto overflow-x-hidden flex flex-col gap-3 px-2 py-1">
            {filteredUsers?.length > 0 ? (
                    filteredUsers.map((user) => <User key={user?._id} user={user} />)
                ) : (
                    <p className="text-gray-500 text-center mt-2">No users found</p>
                )}
               
            </div>
            <div id="user" className="flex items-center p-3 justify-between">
                <div className="avatar ">
                    <div className="ring-primary ring-offset-base-100 w-12 rounded-full ring ring-offset-2">
                        <img src={userProfile?.profile?.avatar} />
                     
                    </div>
                </div>
                <p className="text-2xl tracking-wide " style={{ fontFamily: "Inter, sans-serif" }} >{userProfile?.profile?.username}</p>
                <button onClick={handleLogOut} className="btn btn-sm px-4 rounded-xl bg-red-600 text-sm">Log Out</button>
            </div>
        </div>
    );
};

export default UserSidebar;