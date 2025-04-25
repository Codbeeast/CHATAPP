import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/user/userslice'
import messageReducer from './slice/message/messageSlice'
import socketReducer from './slice/socket/socketSlice.js'
// import { useReducer } from 'react'
export default configureStore({
  reducer: {
    userReducer,messageReducer,socketReducer
  },
  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware({
      serializableCheck:{
        ignoredPaths: ["socketReducer.socket"],
        
      }
    })
  )
})