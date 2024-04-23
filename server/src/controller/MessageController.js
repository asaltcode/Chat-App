import { catchAsyncError } from "../middleware/catchAsyncError.js";
import MessageModel from "../models/MessageModel.js";

const addMessage = catchAsyncError(async (req, res, next) =>{
    const {chatId, senderId, text} = req.body;
    const message = await MessageModel({
        chatId,
        senderId,
        text
    })
    const result = await message.save();
    res.status(201).send({
        success: true,
        result
    })
})
const getMessage = catchAsyncError(async (req, res, next) =>{
    const {chatId} = req.params;
    const result = await MessageModel.find({chatId})
    res.status(200).send({
        success: true,
        result,
        message : "get message"
    })
})

export default {addMessage, getMessage}