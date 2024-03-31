import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import useFetch from "./utils/hooks/useFetch";
import { useDispatch } from "react-redux";
import { userActions } from "./redux/User";
import MainNavigator from "navigation";
import useLoadApp from "utils/hooks/useLoadApp";
import { useAppSelector } from "utils/hooks/hooks";
import { Colors } from "./constants/styles";
import AppProviders from "./utils/providers/index";

function InitApp() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useAppSelector((s) => s.user);
  const [isAppReady] = useLoadApp();

  useFetch("/auth/credentials", {
    invalidate: [isLoggedIn],
    fetchOnMount: isLoggedIn,
    onSuccess: (data: any) => {
      dispatch(userActions.setCredentials(data));
    },
  });

  return isAppReady ? <MainNavigator /> : null;
}

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primary }}>
      <AppProviders>
        <InitApp />
      </AppProviders>
    </SafeAreaView>
  );
}
