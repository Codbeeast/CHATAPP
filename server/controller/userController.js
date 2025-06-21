import { user } from "../model/userModel.js"
import { asyncHandler } from "../utilities/asyncHandler.js"
import { errorHandler } from "../utilities/errorHandler.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'


export const register = asyncHandler(async (req, res, next) => {

    const { fullName, username, password, gender } = req.body
    if (!fullName || !username || !password || !gender) {
        return next(new errorHandler('All field are required', 400))
    }
    const userExist = await user.findOne({ username })
    if (userExist) {
        return next(new errorHandler('Username already exists', 400))
    }

    const gen = gender === "male" ? "boy" : "girl"
    
    //  const avatar = `https://avatar.iran.liara.run/public/${gen}?username=${username}`
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await user.create({
        fullName,
        username,
        password: hashedPassword,
        gender,
        avatar
    })
    const tokenData = {
        _id: userExist?._id
    }
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    })
    res.status(200)
        .cookie('token', token, {
            expires: new Date(
                Date.now() + 30 * 1000
            ),
            httpOnly: true,
            secure: true,
            sameSite: 'none',

        })
        .json({
            success: true,
            responseData: {
                newUser,
                token

            }
        })





}
)

export const login = asyncHandler(async (req, res, next) => {

    const { username, password } = req.body
    if (!username || !password) {
        return next(new errorHandler('Please enter a valid username or password', 400))
    }

    const userExist = await user.findOne({ username })

    if (!userExist) {
        return next(new errorHandler('Please enter a valid username or password', 400))
    }
    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (!isPasswordValid) {
        return next(new errorHandler('Please enter a valid username or password', 400));
    }

    const tokenData = {
        _id: userExist?._id
    }
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES,
    })
    res.status(200)
        .cookie('token', token, {
           expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: true,
            sameSite: 'none',

        })
        .json({
            success: true,
            responseData: {
                userExist,
                token

            }
        })






}
)
export const getProfile = asyncHandler(async (req, res, next) => {



    const userId = req.user._id
    // console.log(userId)

    const profile = await user.findById(userId)

    res.status(200).json({
        success: true,
        responseData: {
            profile
        }
    })


}
)

export const getOtherUsers = asyncHandler(async (req, res, next) => {
    const userId = req.user._id
    const otherUsers = await user.find({ _id: { $ne: userId } })
    res.status(200).json({
        success: true,
        responseData: {
            otherUsers
        }
    })
})
export const logout = asyncHandler(async (req, res, next) => {





    res.status(200)
        .cookie('token', "", {
            expires: new Date(
                Date.now()
            ),
            httpOnly: true,


        })
        .json({
            success: true,
            responseData: {
                message: "Logged out successfully"
            }
        })


}
)


