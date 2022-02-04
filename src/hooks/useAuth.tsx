import { useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { API } from "../constants/routes";

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

export default function useAuth(route: Route) {
  const { SaveUser } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const url = ROUTES[route];

  async function onSubmit({ email, password }: UserInputProps): Promise<any> {
    try {
      setLoading(true);
      const { data } = await axios.post(url, {
        email: email.trim(),
        password: password.trim(),
      });

      setLoading(false);

      return data;
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message);
      setLoading(false);
    }
  }

  // for future updates

  async function onLogin({ email, password }: UserInputProps) {
    try {
      const data = await onSubmit({ email, password });

      SaveUser({
        user_id: data.user_id,
        token: data.token,
        name: email,
        isLoggedIn: true,
      });
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
        activated: data.activated,
        status: "FINISHED",
      });
    } catch (error) {}
  }

  function onClear() {
    setError(null);
  }

  return { loading, error, onLogin, onRegister, status, onClear };
}
