import { asyncHandler } from "../utilities/asyncHandler.js";
import { errorHandler } from "../utilities/errorHandler.js";
import jwt from'jsonwebtoken'
export const isAuthenticated = asyncHandler(async(req,res,next)=>{
    const token= req.cookies.token || req.headers['authorization']?.replace("Bearer","")
    // console.log(token)
    if(!token){
        return(new errorHandler("invalid token",400))
    }
    const tokenData=jwt.verify(token,process.env.JWT_SECRET)
    // console.log("hv",tokenData)
    req.user=tokenData
    // console.log("heloop")
    next()

})