import * as Notifications from "expo-notifications";
import { useState, useRef, useEffect } from "react";
import { registerForPushNotificationsAsync } from "./registerForPushNotificationsAsync";
import { CancelTokenSource } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import http from "utils/service/http/http";
import { navigationRef } from "navigation";

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

    if (isSaved === "false" && !!expoPushToken && isSaved !== null) {
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
    registerForPushNotificationsAsync().then((token: any) => {
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification: any) => {
        Notifications.addNotificationResponseReceivedListener((response) => {
          const request = response.notification.request;

          if (request.content.data.type === "product_update") {
            navigationRef.current?.navigate("Product", {
              prod_id: request.content.data.prod_id,
              sharedID: "",
              isSharedAnimationUsed: false,
              image: undefined,
              title: request.content.data.product_title,
            });
          }
        });

        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((e) => {});

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
