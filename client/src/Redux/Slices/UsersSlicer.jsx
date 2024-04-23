import { createSlice } from "@reduxjs/toolkit";

const UsersSlicer = createSlice({
    name: "users",
    initialState: {
    loading: false,
   
  },
  reducers: {
    userRequest(state, action) {
        return {         
          loading: true,
        };
      },
    userSuccess(state, action) {
        return {
            loading: false,          
            users: action.payload.users,
          };
      },
    userFail(state, action) {
        return {
            loading: false,
            error: action.payload,
          };
      },
    clearSearchUser(state, action) {
        return {
            loading: false,
            users: null
          };
      },
    }
})

const {reducer, actions} = UsersSlicer
export const {userRequest, userSuccess, userFail, clearSearchUser} = actions
export default reducer