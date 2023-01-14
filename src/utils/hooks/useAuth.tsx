import { useState } from "react";
import { useUser } from "@utils/context/UserContext";
import axios from "axios";
import { API } from "@constants/routes";
import { useNavigation } from "@react-navigation/native";

export interface UserInputProps {
  email: string;
  password: string;
}

const ROUTES = {
  login: `${API}/auth/login`,
  register: `${API}/auth/register`,
};

type RegisterStatus = "PENDING" | "FINISHED";

type Route = keyof typeof ROUTES;

interface Callbacks {
  onStart: () => void;
  onSuccess: () => void;
  onFailed: (reason: string | Object) => void;
}

export default function useAuth(route: Route, callbacks?: Partial<Callbacks>) {
  const { SaveUser } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const navigation = useNavigation<any>();

  const url = ROUTES[route];

  async function onSubmit({ email, password }: UserInputProps) {
    let response;
    try {
      setLoading(true);
      setError("");
      callbacks?.onStart?.();

      const { data } = await axios.post(url, {
        email: email.trim(),
        password: password.trim(),
      });

      callbacks?.onSuccess?.();

      response = data;
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message);
      callbacks?.onFailed?.(err);
    } finally {
      setLoading(false);
    }

    return response;
  }

  // for future updates

  // const { setUser } = useUser();

  async function onLogin({ email, password }: UserInputProps) {
    try {
      const data = await onSubmit({ email, password });

      SaveUser({
        user_id: data.user_id,
        token: data.token,
        name: email,
        isLoggedIn: true,
        isLoading: false,
        role: data.role,
      });

      navigation.navigate("Home", {});
    } catch (error) {}
  }

  const [status, setStatus] = useState({
    activated: false,
    status: "PENDING" as RegisterStatus,
  });

  async function onRegister({ email, password }: UserInputProps) {
    try {
      const data = await onSubmit({ email, password });

      setStatus({
        activated: data?.activated,
        status: "FINISHED",
      });
    } catch (error) {}
  }

  function onClear() {
    setError(null);
  }

  return { loading, error, onLogin, onRegister, status, onClear };
}
