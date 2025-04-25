import { createSlice } from '@reduxjs/toolkit'
import { getOthersProfileThunk, getProfileThunk, loginUserThunk, logOutUserThunk, registerUserThunk } from './useThunk'

const savedAuthState = JSON.parse(localStorage.getItem('isAuthenticated'));
const savedUserProfile = JSON.parse(localStorage.getItem('userProfile'));
const savedOtherUsers = JSON.parse(localStorage.getItem('otherUsers'));

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: savedAuthState||false,
    screenLoading: true,
    userProfile: savedUserProfile||null,
    buttonLoading: false,
    otherUsers:savedOtherUsers||[],
    selectedUsers:JSON.parse(localStorage.getItem("selectedUsers"))
  },
  reducers: {
    setSelectedUsers:(state,action)=>{
      localStorage.setItem("selectedUsers",JSON.stringify(action.payload))
    state.selectedUsers=action.payload
    }
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUserThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(loginUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.userExist;
      state.isAuthenticated = true;
      state.buttonLoading = false;
      state.screenLoading = false; 
      localStorage.setItem("isAuthenticated", JSON.stringify(true));// ✅ Stop loading after login
      localStorage.setItem("userProfile", JSON.stringify(state.userProfile));
    });
    builder.addCase(loginUserThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    // Register
    builder.addCase(registerUserThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(registerUserThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData?.userExist;
     
      state.isAuthenticated = true;
      state.buttonLoading = false;
      state.screenLoading = false; // ✅ Stop loading after registration
    });
    builder.addCase(registerUserThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

    // Logout
    builder.addCase(logOutUserThunk.fulfilled, (state) => {
      state.userProfile = null;
      state.isAuthenticated = false;
      state.buttonLoading = false;
      state.screenLoading = false;
      state.otherUsers= [];
      state.selectedUsers=null 
      localStorage.removeItem("userProfile");
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("otherUsers"); // ✅ Remove users from localStorage// ✅ Reset loading state
      localStorage.clear();
    });

    // Get Profile
    // builder.addCase(getProfileThunk.pending, (state) => {
    //   state.buttonLoading = true;
    // });
    builder.addCase(getProfileThunk.fulfilled, (state, action) => {
      state.userProfile = action.payload?.responseData;
      
      state.isAuthenticated = true;
      state.screenLoading = false;
      localStorage.setItem("isAuthenticated", JSON.stringify(true));
      localStorage.setItem("userProfile", JSON.stringify(state.userProfile));
      localStorage.setItem("otherUsers", JSON.stringify(state.otherUsers))
    });
    builder.addCase(getProfileThunk.rejected, (state) => {
      state.screenLoading = false;
    });


//OTHER
    builder.addCase(getOthersProfileThunk.pending, (state) => {
      state.screenLoading = true;
    });
    builder.addCase(getOthersProfileThunk.fulfilled, (state, action) => {
      localStorage.setItem("otherUsers", JSON.stringify(state.otherUsers));
      state.otherUsers = action.payload?.responseData; // ✅ Update user profile
        //  console.log('console',action.payload?.responseData)

      state.screenLoading = false; // ✅ Stop loading after registration
    });
    builder.addCase(getOthersProfileThunk.rejected, (state) => {
      state.buttonLoading = false;
    });

  
  }

});




// Action creators are generated for each case reducer function
export const {setSelectedUsers} = userSlice.actions

export default userSlice.reducer