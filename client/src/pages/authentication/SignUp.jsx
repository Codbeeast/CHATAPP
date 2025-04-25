import React, { useState } from 'react'
import { FaUser } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import Login from './Login';
import { useDispatch,useSelector } from 'react-redux';
import { registerUserThunk } from '../../store/slice/user/useThunk';
import toast from 'react-hot-toast';
const SignUp = () => {
    const navigate= useNavigate()
    const dispatch = useDispatch()
    const {isAuthenticated} = useSelector ((state) => state.userReducer)
    const [signUpData, setSignUpData] = useState({
        username: "",
        fullName: "",
        password: "",
        confirmPassword: "",
        gender: "male"
    })
    
    const signup = (e) => {
        //   e.preventDefault()
        setSignUpData({ ...signUpData, [e.target.name]: e.target.value })
        //   console.log(e.target)
        //   console.log(e.target.value)

    }
    const handleSignUp = async () => {
        if(signUpData.password!==signUpData.confirmPassword){
            return toast.error("confirm password and password do not match")
        }
       
        // console.log('hello')
        // toast.success('login successfully')
        const response = await dispatch(registerUserThunk(signUpData))
        
        if (response?.payload?.success) {
        navigate('/')
    }}
    if(isAuthenticated){
        return navigate('/')  // redirect to home page if user is authenticated already.  // this line should be added in the reducer logic to handle this case.  // but for now, it's here to showcase the login functionality.  // the actual redirection should be handled in the reducer.  // this is just a demonstration.  // the actual implementation should be done in the user slice reducer.  // if the user is authenticated, the user reducer should return an action with type 'AUTH_SUCCESS' instead of 'LOGIN_SUCCESS' and the app should navigate to the home page.  // for simplicity, I've added this line here.  // in a real-world application, the reducer should handle this case.  // this line should be removed after the actual implementation.  // and the login page should also be updated to handle this case.  // if the user is authenticated, the login page should redirect to the home page.  // and the user
    }
    return (
        <div className='flex justify-center items-center p-6 min-h-screen'>
            <div className='max-w-[40rem] w-full p-6 bg-base-200 flex flex-col rounded-2xl gap-5 items-center'>
                <h1 className='text-2xl'>Please!SignUp</h1>
                <label className="input input-bordered flex items-center gap-2 w-full">
                    <FaUser />
                    <input name='fullName' type="text" placeholder="FullName" onChange={signup} />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                    <FaUser />
                    <input name='username' type="text" placeholder="Username" onChange={signup} />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                    <IoKeySharp />
                    <input name="password" type="password" placeholder='Enter password' onChange={signup} />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                    <IoKeySharp />
                    <input name="confirmPassword" type="password" placeholder='Confirm password' onChange={signup} />
                </label>
                <div className="input input-bordered flex items-center gap-2 w-full">
                    <label htmlFor="male">
                <input id="male" type="radio" name="gender" value="male" className="radio" onChange={signup} />Male
                </label>
                <label htmlFor='female'> 
                <input id="female" value="female" type="radio" name="gender" female="female" className="radio" onChange={signup} />Female
                </label></div>
                <button className="btn btn-primary" onClick={handleSignUp}>Sign up</button>
                <p>Already have an account? &nbsp;
                    <Link to="/login" className='text-blue-400 underline'>LogIn</Link> </p>
            </div>
        </div>
    )
}

export default SignUp
