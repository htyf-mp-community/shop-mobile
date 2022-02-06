import { createSlice } from "@reduxjs/toolkit";

const User = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    token: "",
    name: "",
    user_id: -1,

    credentials: {
      name: "",
      surname: "",
      address: "",
      phoneNumber: "",
    },
  },
  reducers: {
    setLoggedIn(state) {
      state.isLoggedIn = true;
    },
  },
});

export const userReducers = User.reducer;
export const userActions = User.actions;
