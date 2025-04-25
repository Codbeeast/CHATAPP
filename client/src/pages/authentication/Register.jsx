import React,{useState} from 'react'
import { FaUser } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
const SignUp = () => {

      return (
          <div className='flex justify-center items-center p-6 min-h-screen'>
              <div className='max-w-[40rem] w-full p-6 bg-base-200 flex flex-col rounded-2xl gap-5 items-center'>
                  <h1 className='text-2xl'>Please!SignUp</h1>
                  <label className="input input-bordered flex items-center gap-2 w-full">
                      <FaUser />
                      <input name='fullName'  type="text"  placeholder="FullName"  />
                  </label>
                  <label className="input input-bordered flex items-center gap-2 w-full">
                      <FaUser />
                      <input name='username'  type="text"  placeholder="Username"  />
                  </label>
                  <label className="input input-bordered flex items-center gap-2 w-full">
                     <IoKeySharp />
                      <input name="password" type="password"  placeholder='Enter password'  />
                  </label>
                  <label className="input input-bordered flex items-center gap-2 w-full">
                     <IoKeySharp />
                      <input name="confirmPassword" type="password"  placeholder='Confirm password'  />
                  </label>
                  <button className="btn btn-primary">Sign up</button>
                  <p>Already have an account? &nbsp;
                    </p>
              </div>
          </div>
      )
  }

export default SignUp
