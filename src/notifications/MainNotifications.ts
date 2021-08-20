import * as Notifications from "expo-notifications";
import { API } from "../constants/routes";
import { useState, useRef, useEffect } from "react";
import { registerForPushNotificationsAsync } from "./registerForPushNotificationsAsync";

export async function UploadExpoTokenToServer(jwt: string) {
  try {
    const expoPushToken = await Notifications.getExpoPushTokenAsync({
      experienceId: "@username/example",
    });

    await fetch(API + "/notifications/upload-token", {
      method: "POST",
      headers: {
        token: jwt,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: expoPushToken.data,
      }),
    }).catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
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
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
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
