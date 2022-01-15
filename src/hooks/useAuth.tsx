import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { API } from "../constants/routes";

type OnSubmitType = {
  email: string;
  password: string;
};

type Route = "login" | "register";

interface useAuthReturn {
  error: string | null;
  loading: boolean;
  onSubmit: ({ email, password }: OnSubmitType) => void;
}

export default function useAuth(route: Route): useAuthReturn {
  const { SaveUser } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const url = route === "login" ? `${API}/auth/login` : `${API}/auth/register`;

  async function onSubmit({ email, password }: OnSubmitType): Promise<void> {
    setLoading(true);
    axios
      .post(
        url,
        {
          email: email.trim(),
          password: password.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(({ data }) => {
        if (typeof data !== "undefined" && data !== null) {
          SaveUser({
            user_id: data.user_id,
            token: data.token,
            name: email,
            isLoggedIn: true,
          });
          setLoading(false);
        }
      })
      .catch((err) => {
        setError(err?.response?.data?.message || err.message);
        setLoading(false);
      });
  }
  return { loading, error, onSubmit };
}
