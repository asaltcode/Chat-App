import ChatModel from "../models/ChatModel.js";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";
import UserModel from "../models/userModel.js";

const createChat = catchAsyncError( async(req, res, next) =>{
    const newChat = await ChatModel.findOne({members: {$all : [req.user.id, req.body.receiverId]}})
    if(newChat){
        return res.status(200).send({
            success: true,
            result : newChat
        })
    }
    const user = await UserModel.findOne({_id: req.body.receiverId})
    if(!user){
        return next(new ErrorHandler("Bad Request", 400))
    }    
    const result = await ChatModel.create({members: [req.user.id, req.body.receiverId]})

    res.status(201).send({
        success: true,
        result
    })

})
const userChats = catchAsyncError( async(req, res, next) =>{
     const chat = await ChatModel.find({
        members: {$in: req.user.id}
     })
     res.status(200).send({
        success: true,
        chat
     })
})
const findChat = catchAsyncError( async(req, res, next) =>{
    const chat = await ChatModel.findOne({
        members: {$all: [req.params.firstId, req.params.secondId]}});
        res.status(200).send({
            success: true,
            chat
        })
})

export default {createChat, userChats, findChat }