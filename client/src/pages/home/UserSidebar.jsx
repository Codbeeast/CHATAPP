import React, { useEffect, useState } from "react";
import { IoSearch } from 'react-icons/io5';
import { motion, useAnimation } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getOthersProfileThunk, logOutUserThunk, getProfileThunk } from "../../store/slice/user/useThunk";
import User from "./User";

const UserSidebar = () => {
  const dispatch = useDispatch();
  const { userProfile} = useSelector(state => state.userReducer);
     const {otherUsers}=useSelector((state)=>{
        return state.userReducer.otherUsers
    })
  const [searchTerm, setSearchTerm] = useState("");
  const controls = useAnimation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(getOthersProfileThunk());
    dispatch(getProfileThunk());
  }, []);

  const handleLogOut = async () => {
    await dispatch(logOutUserThunk());
  };

    const[ab,setAb]= useState(true)
  // Handle drag end - if dragged far enough, close it
  const handleDragEnd = (_, info) => {
    if (ab) {
      controls.start({ x: "0%" }); 
         setAb(false)
    
    } else {
      controls.start({ x: "-95%" }); // Snap back
      setAb(true)
    }
  };
  const filteredUsers = otherUsers?.filter(user =>
    (user?.fullName ?? "").toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user?.username ?? "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const SidebarContent = (
    <>
      <h1 className="bg-black text-white font-bold p-3 text-lg sm:text-xl text-center">My ChatApp</h1>
      <div className="p-3">
        <label className="input flex items-center gap-2">
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="grow text-base sm:text-lg text-white bg-transparent focus:outline-none"
            placeholder="Search"
          />
          <IoSearch size={20} />
        </label>
      </div>
      <div className="flex-1 overflow-y-auto px-2 py-1 space-y-3">
        {filteredUsers?.length > 0 ? (
          filteredUsers.map(user => <User key={user?._id} user={user} />)
        ) : (
          <p className="text-gray-500 text-center">No users found</p>
        )}
      </div>
      <div className="flex items-center p-3 justify-between">
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-10 sm:w-12 rounded-full ring ring-offset-2">
            <img src={userProfile?.profile?.avatar} />
          </div>
        </div>
        <p className="text-sm sm:text-lg font-semibold truncate max-w-[100px]">
          {userProfile?.profile?.username}
        </p>
        <button onClick={handleLogOut} className="btn btn-xs sm:btn-sm bg-red-600 text-white rounded-lg">
          Log Out
        </button>
      </div>
    </>
  );

  return isMobile ? (
    <motion.div
      className="fixed top-0 left-0 bottom-0 z-50 bg-gray-900 text-white w-[80vw] h-screen flex flex-col"
      initial={{ x: "-95%" }}
      animate={controls}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
    >
      {SidebarContent}
    </motion.div>
  ) : (
    <div className="w-[18rem] bg-gray-900 text-white h-screen flex flex-col">
      {SidebarContent}
    </div>
  );
};

export default UserSidebar;
