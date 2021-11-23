import * as Notifications from "expo-notifications";
import { ENDPOINTS } from "../constants/routes";
import { useState, useRef, useEffect } from "react";
import { registerForPushNotificationsAsync } from "./registerForPushNotificationsAsync";
import axios from "axios";

export async function UploadExpoTokenToServer(jwt: string) {
  try {
    const expoPushToken = await Notifications.getExpoPushTokenAsync();

    console.log("expoPushToken: ", expoPushToken);

    if (typeof expoPushToken === "undefined") return;

    await axios
      .post(
        ENDPOINTS.notificationsAddToken,
        { token: expoPushToken },
        {
          headers: {
            token: jwt,
          },
        }
      )
      .then((res) => console.log(res));
  } catch (error: any) {}
}

interface IScheduldeNotificationProps {
  title: string;
  body: string;
  data?: any;
  trigger: Object;
}

export async function schedulePushNotification({
  title,
  body,
  data = "",
  trigger,
}: IScheduldeNotificationProps) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      data: { data },
    },
    trigger: trigger,
  });
}

const useNotifications = () => {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef<any>();
  const responseListener = useRef<any>();

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

  return { notification, expoPushToken };
};

export default useNotifications;
