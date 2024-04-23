import AxiosService from "../../utils/AxiosService";
import { chatFail, chatRequest, chatSuccess, newChatFail, newChatRequest, newChatSuccess } from "../Slices/ChatSlicer";
import { currentChater } from "../Slices/CurrentChatSlicer";

export const getChat = () => async(dispatch) =>{
    try {
        dispatch(chatRequest());
        const { data } = await AxiosService.get(`chat`);
        dispatch(chatSuccess(data));
      } catch (error) {
        dispatch(chatFail(error.response.data.message));
      }
}
export const newChat = (newChatStart) => async(dispatch) =>{
    try {
        dispatch(newChatRequest());
        const { data } = await AxiosService.post(`chat`, newChatStart);
        dispatch(newChatSuccess(data));
        dispatch(currentChater(data.result)) // Current chater update for when search
      } catch (error) {
        dispatch(newChatFail(error.response.data.message));
      }
}