import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Slices/AuthSlicer"
import ChatReducer from "./Slices/ChatSlicer"
import MessageReducer from "./Slices/MessageSlicer"
import CurrentChateReducer from "./Slices/CurrentChatSlicer"
import UsersReducer from "./Slices/UsersSlicer"

const rootReducer = combineReducers({
  authState: AuthReducer,
  chatState: ChatReducer,
  currentChatState: CurrentChateReducer,
  messageState: MessageReducer,
  usersState: UsersReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store