import React from "react";
import { Image, ActivityIndicator } from "react-native";
import Button from "../components/Button/Button";
import { useUser } from "../context/UserContext";
import { API } from "../constants/routes";
import { useState } from "react";

interface AddtoCartProps {
  prod_id: number;
}

interface IconProps {
  loading: boolean;
  success: string;
  error: boolean;
}

const Icon = ({ loading, success, error }: IconProps) => {
  if (loading) {
    return (
      <ActivityIndicator size="small" color="#fff" style={{ padding: 2 }} />
    );
  }
  if (error) {
    return <Image source={require("../assets/close.png")} />;
  }
  if (success === "Added") {
    return <Image source={require("../assets/done.png")} />;
  }
  return <Image source={require("../assets/basket.png")} />;
};

export default function AddToCart({ prod_id }: AddtoCartProps) {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [result, setResult] = useState("");

  async function PushToCart() {
    try {
      setLoading(true);
      const res = await fetch(API + "/cart/add-to-cart", {
        method: "POST",
        body: JSON.stringify({ prod_id }),
        headers: {
          "Content-Type": "application/json",
          token: user.token,
        },
      });

      const data = await res.json();
      if (data !== null && res.status === 201) {
        setResult(data.status);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <Button
      callback={PushToCart}
      style={{
        color: "#fff",
        width: 50,
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: result === "Added" ? "#2F4858" : "#009950",
      }}
      icon={<Icon loading={loading} success={result} error={!!error} />}
    />
  );
}
