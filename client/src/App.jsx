import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import "@fontsource/inter"; // Inter Font (Professional & Clean)


import Home from './pages/home/Home';
import { Toaster } from "react-hot-toast";
const App = () => {
  const dispatch = useDispatch();


  return (
    <div>
      {/* <Home /> */}
     <Toaster position='top-center' reverseOrder={false} />
    </div>
  );
};

export default App;
