import axios from "axios";
import { useEffect } from "react";
import { API } from "@constants/routes";
import { USER_PREFIX, useUser } from "@utils/context/UserContext";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../../@types/types";

export default function useCheckToken(): UserType {
  const { user, setUser, SaveUser } = useUser();

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    if (user.token) {
      (async () => {
        try {
          const { data } = await axios.post(
            `${API}/auth/token`,
            {},
            {
              headers: { token: user.token },
              cancelToken: cancelToken.token,
            }
          );

          SaveUser({ ...user, token: data.token, user_id: data.id });
        } catch (err: any) {
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
      })();
    }

    return () => cancelToken.cancel("Canceled");
  }, [user.token]);

  return user;
}
