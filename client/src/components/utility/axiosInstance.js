import axios from "axios"; 
const DB_URL=import.meta.env.VITE_API_URL || 'http://localhost:5000'
export const axiosInstance = axios.create({
 
    baseURL : DB_URL,
  withCredentials:true,
  headers: {
//  Authorization: `<Your Auth Token>`,
    ContentType: "application/json",
    
    timeout : 1000,
  }, 
  // .. other options
});

