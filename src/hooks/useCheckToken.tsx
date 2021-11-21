import axios from "axios";
import { useEffect } from "react";
import { API } from "../constants/routes";
import { USER_PREFIX, useUser } from "../context/UserContext";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useCheckToken() {
  const { user, SaveUser } = useUser();

  useEffect(() => {
    if (user.token) {
      axios
        .post(`${API}/auth/token`, {}, { headers: { token: user.token } })
        .then(({ data }) => {
          SaveUser({
            isLoggedIn: true,
            token: data.token,
            name: user.name,
            user_id: data.id,
          });
        })
        .catch(async (err) => {
          console.log(err.response.data);
          Alert.alert("Session Expired", "Please login again", [
            {
              text: "Log in",
              onPress: async () => await AsyncStorage.removeItem(USER_PREFIX),
            },
          ]);
        });
    }
  }, [user.token]);

  return user.isLoggedIn;
}
