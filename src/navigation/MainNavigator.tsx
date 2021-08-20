import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Home from "./Screens/Home";
import Auth from "./Screens/Auth";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import Cart from "./Screens/Cart";
import TabBar from "./TabBar";
import { Colors } from "../constants/styles";

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

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Auth"
        tabBar={TabBar}
        screenOptions={{
          tabBarStyle: { position: "absolute" },
        }}
      >
        {user.token !== "" ? (
          <>
            <Tab.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Tab.Screen
              name="Cart"
              component={Cart}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Tab.Screen
            name="Auth"
            options={{ headerShown: false }}
            component={Auth}
          />
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
