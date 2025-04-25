import { createSlice } from '@reduxjs/toolkit'
// import { getOthersProfileThunk, getProfileThunk, loginUserThunk, logOutUserThunk, registerUserThunk } from './useThunk'
import { getMessageThunk, sendMessageThunk } from './messageThunk';
// import { setSelectedUsers } from '../user/userslice';
import { useSelector } from 'react-redux';


  
export const messageSlice = createSlice({
  
  name: 'message',
  initialState: {
    screenLoading:false,
    buttonLoading: false,
    messages:[]
  },
  reducers: {
    setNewMess:(state,action)=>{
      // const { selectedUsers } = useSelector(state => state.userReducer);
     state.messages = [...(state.messages || []), action.payload];  // ✅ Default to []
    }
  },
  extraReducers: (builder) => {
    // send
      builder.addCase(sendMessageThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
     console.log( action.payload?.responseData)
     
      state.messages = [...(state.messages || []), action.payload?.responseData?.newMessage];  // ✅ Default to []
     
      state.buttonLoading = false; // ✅ Stop loading after registration
    });
    builder.addCase(sendMessageThunk.rejected, (state) => {
      state.buttonLoading = false;
    });


    //get
    builder.addCase(getMessageThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(getMessageThunk.fulfilled, (state, action) => {
     console.log(action.payload?.responseData?.convo?.messages)
     state.messages=action.payload?.responseData?.convo?.messages
      state.screenLoading = false; // ✅ Stop loading after registration
    });
    builder.addCase(getMessageThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

  
  }

  
  }


  
);




// Action creators are generated for each case reducer function
export const {setNewMess} = messageSlice.actions

export default messageSlice.reducer