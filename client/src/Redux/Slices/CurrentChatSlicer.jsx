import { createSlice } from "@reduxjs/toolkit";

const CurrentChatSlicer = createSlice({
    name: "currentChat",
    initialState: {
    currentChat: null
  },
  reducers: {
    currentChater(state, action){
      return {
        currentChat : action.payload
    }
    }    
  }
})


const {reducer, actions} = CurrentChatSlicer
export const {currentChater} = actions
export default reducer