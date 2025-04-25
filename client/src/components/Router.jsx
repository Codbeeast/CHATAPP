import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/home/Home.jsx'
import Login from '../pages/authentication/Login.jsx'
import SignUp from '../pages/authentication/SignUp.jsx'
import ProtectedRoute from './utility/ProtectedRoute.jsx'


const Router = () => {
    const router=createBrowserRouter([{
        path:"/",
        element:(
        <ProtectedRoute>
        <Home />
        </ProtectedRoute>)
        
      },
      {path:"/login",
        element:<Login />},
        {path:"/signup",
          element:<SignUp />}
      
      ]
      )
      
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default Router
