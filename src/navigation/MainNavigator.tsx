import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Home from "./Screens/Home";
import Auth from "./Screens/Auth";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";
import Cart from "./Screens/Cart";

const Stack = createStackNavigator();

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
      <Stack.Navigator initialRouteName="Auth">
        {user.token !== "" ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Cart" component={Cart} />
          </>
        ) : (
          <Stack.Screen
            name="Auth"
            options={{ headerShown: false }}
            component={Auth}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
