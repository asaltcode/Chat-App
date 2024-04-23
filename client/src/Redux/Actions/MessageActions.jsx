import ApiRoutes from "../../utils/ApiRoutes";
import AxiosService from "../../utils/AxiosService"
import {  addMessagesRequest, addMessagesSuccess, messageFail, messageRequest, messageSuccess, receiveMessages } from "../Slices/MessageSlicer";

export const getMessages = (id) => async(dispatch) =>{
    try {
        dispatch(messageRequest())
        console.log("Calls")
        const {data} = await AxiosService.get(`${ApiRoutes.MESSAGE.path}/${id}`)
        dispatch( messageSuccess(data))
    } catch (error) {
        dispatch(messageFail(error.response.data.message));
    }
}
export const newMessage = () => async(dispatch) =>{
    try {
        messageRequest()
        const {data} = AxiosService.post()
        messageSuccess(data)
    } catch (error) {
        dispatch(messageFail(error.response.data.message));
    }
}
export const addMessage = (newMes) => async(dispatch) =>{
    try {
        dispatch(addMessagesRequest())
        const {data} = await AxiosService.post(ApiRoutes.MESSAGE.path, newMes)
        dispatch(addMessagesSuccess(data))
    } catch (error) {
        dispatch(messageFail(error.response.data.message));
    }
}

export const receiveMessage = (data) => (dispatch) =>{
    dispatch(receiveMessages(data))
}
