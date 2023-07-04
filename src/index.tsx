import useFetch from "./utils/hooks/useFetch";
import { useDispatch } from "react-redux";
import useNotifications from "./utils/notifications/MainNotifications";
import useCheckToken from "./utils/hooks/useCheckToken";
import { userActions } from "./redux/User";
import { useEffect } from "react";
import MainNavigator from "navigation";
import axios from "axios";
import useLoadApp from "utils/hooks/useLoadApp";
import { useAppSelector } from "utils/hooks/hooks";

export default function InitApp() {
  const { isNotificationsTokenUploaded } = useNotifications();
  const dispatch = useDispatch();
  const { token, isLoggedIn } = useAppSelector((s) => s.user);
  const [isAppReady] = useLoadApp();

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

  return isAppReady ? <MainNavigator /> : null;
}
