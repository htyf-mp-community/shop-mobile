import * as Notifications from "expo-notifications";
import { ENDPOINTS } from "@constants/routes";
import { useState, useRef, useEffect } from "react";
import { registerForPushNotificationsAsync } from "./registerForPushNotificationsAsync";
import axios, { CancelTokenSource } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import http from "utils/service/http/http";

const NOTIFICATIONS_KEY = "MobileNotifications";

const useNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

  async function isNotificationsTokenUploaded(
    token: string,
    cancelToken: CancelTokenSource
  ) {
    const isSaved = await AsyncStorage.getItem(NOTIFICATIONS_KEY);

    if (isSaved === "false" && !!expoPushToken) {
      await http().post(
        "/notifications/upload-token",
        {
          token: expoPushToken,
        },
        { cancelToken: cancelToken.token }
      );

      await AsyncStorage.setItem(NOTIFICATIONS_KEY, "true");
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
