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

/**
 * Hook for user authentication (register,login)
 * @param {String} route based on route argument ENDPOINT changes
 * @returns {useAuthReturn} Object with loading status, error if there is one,
  onSubmit function that takes object with email and password properties as an argument, 
  if request is successfull it saves user in AsyncStorage and sets UserState
 **/

export default function useAuth(route: Route): useAuthReturn {
  const { SaveUser } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const url = route === "login" ? `${API}/auth/login` : `${API}/auth/register`;

  /**
   * @param {OnSubmitType} { email,password } are user's credentials
   **/

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
