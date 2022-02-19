import { UserType } from "/@types/types";
import axios from "axios";
import { API } from "constants/routes";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./hooks";
import { USER_PREFIX } from "utils/context/UserContext";
import { setItemAsync, getItemAsync, deleteItemAsync } from "expo-secure-store";
import { userActions } from "redux/User";

export default function useUser() {
  const dispatch = useDispatch();
  const { token } = useAppSelector((state) => state.user);

  const instance = axios.create({
    baseURL: API,
    headers: {
      token,
    },
  });
  async function saveUser(props: UserType) {
    try {
      const value = await setItemAsync(USER_PREFIX, JSON.stringify(props));

      if (value !== null) {
        dispatch(userActions.setUser(value));
      }
    } catch (error) {
      console.warn(error);
    }
  }

  async function readUser(onSplashScreen: () => void) {
    try {
      const value = await getItemAsync(USER_PREFIX);

      if (value !== null) {
        dispatch(userActions.setUser(value));
      }
    } catch (error) {
      dispatch(userActions.removeUser());
    }
    onSplashScreen();
  }

  async function removeUser() {
    await deleteItemAsync(USER_PREFIX);
    dispatch(userActions.removeUser());
  }

  return { instance, saveUser, readUser, removeUser };
}
