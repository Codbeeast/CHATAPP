import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast"
import { axiosInstance } from "../../../components/utility/axiosInstance"


const scheduleAutoLogout = (delayMs = 24 * 60 * 60 * 1000) => {
  
  setTimeout(() => {
    localStorage.removeItem("userProfile");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("otherUsers");
    localStorage.clear();
    toast.error("Session Expired! Redirecting to login...")
    setTimeout(() => {
      window.location.href = ("/login")
    }, 2000)

  }, delayMs);
};


export const loginUserThunk = createAsyncThunk(
  "user/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/login", {
        username,
        password,
      });

      toast.success("Login Successfully");
      scheduleAutoLogout()
      return response.data;
    } catch (err) {
      console.error(err);

      const errorOutput =
        err?.response?.data?.errMessage || "Login failed. Try again.";
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);


export const registerUserThunk = createAsyncThunk("user/register",

  async ({ username, fullName, password, gender }, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.post('/user/register', {
        username,
        password,
        fullName,
        gender
      })
      toast.success("Account Created Successfully")
      scheduleAutoLogout()
      return response.data
    } catch (err) {
      console.error(err)
      const errorOutput = err?.response?.data?.errMessage

      toast.error(errorOutput)
      return rejectWithValue(errorOutput)

    }
  })


export const getProfileThunk = createAsyncThunk("user/getprofile",

  async (_, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.get('/user/getprofile')
      return response.data
    } catch (err) {
      console.error(err)
      const errorOutput = err?.response?.data?.errMessage

      //  toast.error(errorOutput)
      return rejectWithValue(errorOutput)

    }
  })

export const getOthersProfileThunk = createAsyncThunk("user/Others",

  async (_, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.get('/user/getOthers')
      return response.data
    } catch (err) {
      console.error(err)
      const errorOutput = err?.response?.data?.errMessage

      //  toast.error(errorOutput)
      return rejectWithValue(errorOutput)

    }
  })
export const logOutUserThunk = createAsyncThunk("user/logout",
  async (_, { rejectWithValue }) => {

    try {
      const response = await axiosInstance.post("/user/logout");
      toast.success("Log Out Successfully");
      return response.data;
    } catch (err) {
      console.error("❌ Logout failed", err);
      const errorOutput = err?.response?.data?.errMessage || "Logout failed.";
      toast.error(errorOutput);
      return rejectWithValue(errorOutput);
    }
  }
);
