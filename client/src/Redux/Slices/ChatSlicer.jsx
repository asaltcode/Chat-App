import { createSlice } from "@reduxjs/toolkit";

const ChatSlicer = createSlice({
    name: "chat",
    initialState: {
    loading: false,
  },
  reducers: {
    chatRequest(state) {
        return {
          ...state,
          loading: true,
        };
      },
      chatSuccess(state, action) {
        return {
          loading: false,          
          chat: action.payload.chat,
        };
      },
      chatFail(state, action) {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      },
    newChatRequest(state) {
        return {
          ...state,
          loading: true,
        };
      },
      newChatSuccess(state, action) {
        return {
          ...state,
          loading: false,        
        };
      },
      newChatFail(state, action) {
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      },
      clearChatError(state, action) {
        return {
          ...state,
          error: null,
        };
      },
      
  }
})

const {reducer, actions} = ChatSlicer
export const {chatRequest, chatSuccess, chatFail, newChatRequest, newChatSuccess, newChatFail, clearChatError} = actions
export default reducer