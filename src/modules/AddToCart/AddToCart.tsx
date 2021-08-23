import React from "react";
import { Image, ActivityIndicator } from "react-native";
import Button from "../../components/Button/Button";
import { useUser } from "../../context/UserContext";
import { API } from "../../constants/routes";
import { useState } from "react";
import { Colors } from "../../constants/styles";

interface AddtoCartProps {
  prod_id: number;
  style?: any;
}

interface IconProps {
  loading: boolean;
  success: string;
  error: boolean;
}

const Icon = ({ loading, success, error }: IconProps) => {
  if (loading) {
    return (
      <ActivityIndicator
        size="small"
        color={Colors.text}
        style={{ padding: 2 }}
      />
    );
  }
  if (error) {
    return <Image source={require("../../assets/close.png")} />;
  }
  if (success === "Added") {
    return <Image source={require("../../assets/done.png")} />;
  }
  return <Image source={require("../../assets/basket.png")} />;
};

export default function AddToCart({ prod_id, style }: AddtoCartProps) {
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
      style={[
        {
          color: "#fff",
          width: 50,
          position: "absolute",
          bottom: 10,
          right: 10,
          height: 50,
          backgroundColor: result === "Added" ? Colors.ternary : "#009950",
        },
        style,
      ]}
      icon={<Icon loading={loading} success={result} error={!!error} />}
    />
  );
}