import axios from "axios";
import { useEffect } from "react";
import { API } from "@constants/routes";
import { USER_PREFIX, useUser } from "@utils/context/UserContext";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../../@types/types";
import { useDispatch } from "react-redux";
import { userActions } from "redux/User";
import { useAppSelector } from "./hooks";

export default function useCheckToken() {
  const { setUser, SaveUser, ReadUser } = useUser();
  const dispatch = useDispatch();
  const user = useAppSelector((s) => s.user);

  async function loadUser() {
    const cancelToken = axios.CancelToken.source();

    const usr = await ReadUser();

    try {
      if (typeof usr === "undefined" || usr?.token === undefined)
        throw new Error("no_token");

      const { data } = await axios.post(
        `${API}/auth/token`,
        {},
        {
          headers: { token: usr.token },
          cancelToken: cancelToken.token,
        }
      );

      SaveUser({ ...user, token: data.token, user_id: data.id });

      dispatch(
        userActions.setUser({
          ...user,
          token: data.token,
          user_id: data.id,
          role: usr.role,
        })
      );

      return usr;
    } catch (err: any) {
      if (err.message === "no_token") return;

      if (typeof err?.response?.data !== "undefined") {
        Alert.alert("Session Expired", "Please login again", [
          {
            text: "Log in",
            onPress: () => {
              AsyncStorage.removeItem(USER_PREFIX).then(() => {
                setUser((p: UserType) => ({ ...p, isLoggedIn: false }));
              });
            },
          },
        ]);
      }
    }
  }

  return { ...user, loadUser };
}
