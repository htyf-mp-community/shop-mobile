import { createSlice } from "@reduxjs/toolkit";

interface CredentialsProps {
  name: string;
  surname: string;
  address: string;
  phone_number: string;
}

const initialState = {
  isLoggedIn: false,
  token: "",
  name: "",
  user_id: -1,

  isLoading: true,

  credentials: {
    name: "",
    surname: "",
    address: "",
    phone_number: "",
  },
};

type State = typeof initialState;

const User = createSlice({
  name: "user",
  initialState,

  reducers: {
    setLoggedIn(state: State) {
      state.isLoggedIn = true;
      state.isLoading = false;
    },

    setUser(
      state: State,
      {
        payload,
      }: {
        payload: {
          token: string;
          user_id: number;
          name: string;
        };
      }
    ) {
      state.isLoggedIn = true;
      state.token = payload.token;
      state.name = payload.name;
      state.user_id = payload.user_id;
      state.isLoading = false;
    },

    removeUser(state: State) {
      state = initialState;
    },

    setCredentials(state: State, { payload }: { payload: CredentialsProps }) {
      state.credentials.address = payload.address;
      state.credentials.name = payload.name;
      state.credentials.surname = payload.surname;
      state.credentials.phone_number = payload.phone_number;
    },

    setCredentialsKey(
      state: State,
      { payload }: { payload: { value: string; key: string } }
    ) {
      state.credentials[payload.key as keyof CredentialsProps] = payload.value;
    },
  },
});

export const userReducers = User.reducer;
export const userActions = User.actions;
