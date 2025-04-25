import { createAsyncThunk } from "@reduxjs/toolkit";
import {toast} from "react-hot-toast"
import { axiosInstance } from "../../../components/utility/axiosInstance"


export const sendMessageThunk= createAsyncThunk("message/send", 
    async({receiverId,message},{rejectWithValue})=>{
   try{
    const response= await axiosInstance.post(`message/send/${receiverId}`,{
        message
    })
    
    return response.data
   }catch(err){
    console.error(err)
     const errorOutput = err?.response?.data?.errMessage
     toast.error(errorOutput)
     return rejectWithValue(errorOutput)
  
   }
})

export const getMessageThunk= createAsyncThunk("message/get", 
    async({receiverId,message},{rejectWithValue})=>{
   try{
    const response= await axiosInstance.get(`message/getmessages/${receiverId}`)
    
    return response.data
   }catch(err){
    console.error(err)
     const errorOutput = err?.response?.data?.errMessage
     toast.error(errorOutput)
     return rejectWithValue(errorOutput)
  
   }
})


