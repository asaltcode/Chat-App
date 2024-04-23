import { catchAsyncError } from "../middleware/catchAsyncError.js";
import UserModel from "../models/userModel.js";
import APIFeatures from "../utils/apiFeatures.js";
import ErrorHandler from "../utils/errorHandler.js";


const getAllUser = catchAsyncError(async (req, res) => {
  
    const users = await UserModel.find();
    res.status(200).send({
      success: true,
      users,
    });
  })
  const getUserById = catchAsyncError(async (req, res, next) => {  
    const user = await UserModel.findOne({ _id: req.params.id });
    if (user) {
       next(new ErrorHandler("User not found", 404))
    } 
    res.status(200).send({
      success: true,
      user,
      message: "User fetched successfully!",
    });
  })
  
  const getUser = catchAsyncError(async (req, res, next) => {
    const user = await UserModel.findById(req.user.id);
    res.status(200).send({
      success: true,
      user,
    });
  });

  const searchUser = catchAsyncError(async (req, res, next) =>{
    const ApiFeatre = new APIFeatures(UserModel.find(), req.query).search()
    const users = await ApiFeatre.query
    res.status(200).send({
      users
    })
  })

  export default {getAllUser, getUserById, getUser, searchUser}