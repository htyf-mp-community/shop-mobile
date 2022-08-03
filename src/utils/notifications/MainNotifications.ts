import * as Notifications from "expo-notifications";
import { ENDPOINTS } from "@constants/routes";
import { useState, useRef, useEffect } from "react";
import { registerForPushNotificationsAsync } from "./registerForPushNotificationsAsync";
import axios from "axios";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUser } from "utils/context/UserContext";

export async function UploadExpoTokenToServer(
  jwt: string,
  expoPushToken: string
) {
  try {
    await axios.post(
      ENDPOINTS.notificationsAddToken,
      { token: expoPushToken },
      {
        headers: {
          token: jwt,
        },
      }
    );
  } catch (error: any) {}
}

const NOTIFICATIONS_KEY = "MobileNotifications";

const useNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  const { user } = useUser();

  async function isNotificationsTokenUploaded() {
    const isSaved = await AsyncStorage.getItem(NOTIFICATIONS_KEY);

    if (isSaved === "false" && !!expoPushToken) {
      try {
        await UploadExpoTokenToServer(user.token, expoPushToken);
      } catch (err) {}
      try {
        await AsyncStorage.setItem(NOTIFICATIONS_KEY, "true");
      } catch (error) {}
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token: any) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification: any) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((e) => {
        console.log(e);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return { notification, expoPushToken, isNotificationsTokenUploaded };
};

export default useNotifications;
