import React,{useState,useEffect} from 'react'
import { FaUser } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { Link, useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import {toast} from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk } from '../../store/slice/user/useThunk';
const Login = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {isAuthenticated} = useSelector ((state) => state.userReducer)
    const[loginData,setLoginData]=useState({
        username:"",
        password:""
    })
    const login=(e)=>{
        //   e.preventDefault()
          setLoginData({...loginData,[e.target.name]:e.target.value})
        //   console.log(e.target)
        //   console.log(e.target.value)
         
    }
    const handleLogin=async()=>{
        // console.log('hello')
        // toast.success('login successfully')
      const response= await dispatch(loginUserThunk(loginData))
      if (response?.payload?.success) {
        navigate('/')}
      
    //   console.log(response)
    }
    
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');  // Redirect after component mounts
        }
    }, [isAuthenticated, navigate]); // Runs when `isAuthenticated` changes

    return (
        <div className='flex justify-center items-center p-6 min-h-screen'>
            <div className='max-w-[40rem] w-full p-6 bg-base-200 flex flex-col rounded-2xl gap-5 items-center'>
                <h1 className='text-2xl'>Please!Login</h1>
                <label className="input input-bordered flex items-center gap-2 w-full">
                    <FaUser />
                    <input name='username'  type="text"  placeholder="Username" onChange={login} />
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                   <IoKeySharp />
                    <input onKeyPress={(e)=>{
                        if (e.key === 'Enter') {
                          handleLogin()
                        }
                    }} name="password" type="password"  placeholder='Enter password' onChange={login} />
                </label>
                <button className="btn btn-primary" onClick={handleLogin}>Log In</button>
                <p>Don't have an account? &nbsp;
                    <Link to="/signup" className='text-blue-400 underline'>SignUp</Link></p>
            </div>
        </div>
    )
}

export default Login
