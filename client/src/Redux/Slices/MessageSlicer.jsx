import { createSlice } from "@reduxjs/toolkit";

const MessageSlicer = createSlice({
    name: "message",
    initialState: {
    loading: false,
  },
  reducers: {
    messageRequest(state) {
        return {
          ...state,
          loading: true,
        };
      },
     messageSuccess(state, action) {
        return {
          loading: false,          
          message: action.payload.result,
        };
      },
     messageFail(state, action) {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      },
     addMessagesRequest(state, action) {
        return {
            ...state,
            loading: true,
        };
      },
     addMessagesSuccess(state, action) {
        const newMessage = [...state.message, action.payload.result];
        return {
          loading: false,          
          message: newMessage,
          lastMessage: action.payload.result
        };
      },      
     receiveMessages(state, action) {
        const newMessage = [...state.message, action.payload];
        return {
          loading: false,          
          message: newMessage,
        };
      },   
      clearMessageError(state, action) {
        return {
          message: null,
          error: null,
        };
      },   
  }
})

const {reducer, actions} = MessageSlicer
export const {messageRequest, messageSuccess, messageFail, addMessagesRequest, addMessagesSuccess, receiveMessages, clearMessageError} = actions
export default reducer