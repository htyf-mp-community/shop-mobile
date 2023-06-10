import { EvilIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import useFetch from "./utils/hooks/useFetch";
import { useUser } from "./utils/context/UserContext";
import { useDispatch } from "react-redux";
import useNotifications from "./utils/notifications/MainNotifications";
import useCheckToken from "./utils/hooks/useCheckToken";
import { userActions } from "./redux/User";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import MainNavigator from "navigation";
import axios from "axios";
import { useApolloClient } from "@apollo/client";
import { GET_SALE } from "modules/DailySale/hooks/useDailySale";

export default function InitApp() {
  const [appReady, setAppReady] = useState(false);
  const { isLoggedIn, token } = useCheckToken();
  const { isNotificationsTokenUploaded } = useNotifications();
  const dispatch = useDispatch();
  const { ReadUser } = useUser();

  const apollo = useApolloClient();

  useEffect(() => {
    async function prepare() {
      try {
        const usr = await ReadUser();

        await Font.loadAsync({
          PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
          PoppinsThin: require("../assets/fonts/Poppins-Thin.ttf"),
          PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
          PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
          PoppinsLight: require("../assets/fonts/Poppins-Light.ttf"),
          PoppinsBlack: require("../assets/fonts/Poppins-Black.ttf"),
          ...EvilIcons.font,
          ...MaterialCommunityIcons.font,
        });

        if (usr?.token)
          await apollo.query({
            query: GET_SALE,
            context: { headers: { token: usr.token } },
          });
      } catch (error) {
        console.warn(error);
      } finally {
        setAppReady(true);
      }
    }
    prepare();
  }, []);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    isNotificationsTokenUploaded(token, cancelToken);

    return () => cancelToken.cancel();
  }, [token]);

  useFetch("/auth/credentials", {
    invalidate: [isLoggedIn],
    fetchOnMount: isLoggedIn,
    onSuccess: (data: any) => {
      dispatch(userActions.setCredentials(data));
    },
  });

  return appReady ? <MainNavigator /> : null;
}
