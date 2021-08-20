import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Home from "./Screens/Home";
import Auth from "./Screens/Auth";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import Cart from "./Screens/Cart";
import TabBar from "./TabBar";
import { UploadExpoTokenToServer } from "../notifications/MainNotifications";
import useNotifications from "../notifications/MainNotifications";
import User from "./Screens/User";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const { setUser, ReadUser, user } = useUser();

  useEffect(() => {
    (async () => {
      const res: any = await ReadUser();
      if (res !== null) {
        const raw = JSON.parse(res);

        setUser(raw);
      }
    })();
  }, []);
  const { expoPushToken } = useNotifications();

  useEffect(() => {
    if (expoPushToken) {
      UploadExpoTokenToServer(user.token);
    }
  }, [expoPushToken]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Auth"
        tabBar={TabBar}
        screenOptions={{
          tabBarStyle: { position: "absolute" },
          headerShown: false,
        }}
      >
        {user.token !== "" ? (
          <>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Cart" component={Cart} />
            <Tab.Screen component={User} name="User" />
          </>
        ) : (
          <Tab.Screen name="Auth" component={Auth} />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
