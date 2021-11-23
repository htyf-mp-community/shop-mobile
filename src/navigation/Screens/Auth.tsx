import React from "react";
import { View } from "react-native";
import AuthForm from "../../modules/AuthForm/AuthForm";
import { Colors } from "../../constants/styles";
import { API } from "../../constants/routes";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import axios from "axios";

type OnSubmitType = {
  email: string;
  password: string;
};

export default function Auth() {
  const { SaveUser } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  async function onSubmit({ email, password }: OnSubmitType) {
    setLoading(true);
    axios
      .post(
        `${API}/auth/login`,
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
        setError(err.response.data.message || err.message);
        setLoading(false);
      });
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.primary,
      }}
    >
      <AuthForm onSubmit={onSubmit} />
    </View>
  );
}
