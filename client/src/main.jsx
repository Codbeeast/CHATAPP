import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Router from './components/Router.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import SignUp from './pages/authentication/SignUp';
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <Provider store={store}> 
  {/* <RouterProvider router={router} /> */}
   <Router />

  <App />
 
  </Provider>
 
)
