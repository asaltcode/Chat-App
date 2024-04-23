import UserModel from "../models/userModel.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";

import sendToken from "../utils/JWT.js";
import ErrorHandler from "../utils/errorHandler.js";

// Register new user
const registerUser = catchAsyncError(async (req, res, next) => {
    const {username, email, password} = req.body
    const user = await UserModel.create({username, email, password})

    await sendToken(user, 201, res, "Signup Successfully")
    
    })

// Login User

// Changed
const loginUser = catchAsyncError(async (req, res, next) => {
  const { email , password } = req.body;
  if(!email || !password){
    return next(new ErrorHandler("Please enter email & password", 400))
  }
  const user = await UserModel.findOne({email}).select("+password")
  if(!user){
    return next(new ErrorHandler("Invalid email or password", 401))
  }
  if(!await user.isValidPassword(password)){
    return next(new ErrorHandler("Invalid email or password", 401))
}
// res.status(201).send({
//   message: "suuu"
// })
await sendToken(user, 201, res)
})
  

const logout = catchAsyncError(async (req, res, next) => {
  res.clearCookie("token", {
      expires: new Date(0),
      httpOnly: true,
      secure: true,
      'Cache-Control': 'no-store'
  }).status(200).send({
      success: true,
      message: "Logged out"
  });
});

export default {registerUser, loginUser, logout}