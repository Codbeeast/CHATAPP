import { createSlice } from '@reduxjs/toolkit'

import io from 'socket.io-client'


export const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    socket:null,
    onlineUsers:[]
  },
  reducers: {
    initializeSocket: (state,action) => {
        
        const socket = io(import.meta.env.VITE_DB_URL,{query:{
            userId: action.payload,
    },
})
         state.socket = socket
         
        
    },
    setOnlineUsers:(state,action) => {
        console.log("🚀 Updating online users in Redux:", action.payload);
        state.onlineUsers = action.payload
    }
  },
})


  export const {initializeSocket,setOnlineUsers} = socketSlice.actions
  
  export default socketSlice.reducer