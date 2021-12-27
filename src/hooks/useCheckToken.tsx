import axios from "axios";
import { useEffect } from "react";
import { API } from "../constants/routes";
import { USER_PREFIX, useUser } from "../context/UserContext";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserType } from "../@types/types";

/**
 * Hook that sends request for new JWT token to the server, if current token is invalid it displays global modal and forces user to sign again
 * @returns {UserType} user state
 **/
export default function useCheckToken(): UserType {
  const { user, SaveUser, setUser } = useUser();

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
        .catch(async () => {
          Alert.alert("Session Expired", "Please login again", [
            {
              text: "Log in",
              onPress: async () => {
                await AsyncStorage.removeItem(USER_PREFIX);
                setUser((p: UserType) => ({ ...p, isLoggedIn: false }));
              },
            },
          ]);
        });
    }
  }, [user.token]);

  return user;
}
