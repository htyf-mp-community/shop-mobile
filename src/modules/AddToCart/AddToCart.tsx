import React, { useEffect } from "react";
import { ActivityIndicator, StyleProp, ViewStyle } from "react-native";
import Button from "../../components/Button/Button";
import { useUser } from "../../context/UserContext";
import { ENDPOINTS } from "../../constants/routes";
import { useState } from "react";
import { Colors } from "../../constants/styles";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

interface AddtoCartProps {
  prod_id: number;
  style?: StyleProp<ViewStyle>;
  refetch?: () => void;
}

interface IconProps {
  loading: boolean;
  success: string;
  error: boolean;
}

/**
 * It shows Icon based on arguments
 * @param {Boolean} loading represents if query have finished
 * @param {String} success response from the server, based on Component displays icon
 * @param {Boolean} error
 **/

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
    return <Ionicons name="close-outline" size={22} color={Colors.text} />;
  }
  if (success === "Added") {
    return <Ionicons name="checkmark-done" size={22} color={Colors.text} />;
  }
  return <FontAwesome5 name="shopping-basket" size={24} color="white" />;
};

/**
 * @param {Number} prod_id
 * @param {StyleProp<ViewStyle>} style styling for Component
 * @param {Function} refetch function that refreshes other component, is not compulsory
 **/

export default function AddToCart({
  prod_id,
  style,
  refetch = () => {},
}: AddtoCartProps) {
  const { user } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [result, setResult] = useState("");

  async function PushToCart() {
    setLoading(true);
    axios
      .post(
        ENDPOINTS.cartAdd,
        { prod_id },
        {
          headers: {
            token: user.token,
          },
        }
      )
      .then(({ data, status }) => {
        if (data !== null && status === 201) {
          setResult(data.status);
          setLoading(false);
          refetch();
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setResult("");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [PushToCart]);

  return (
    <Button
      callback={PushToCart}
      style={[
        {
          width: 50,
          position: "absolute",
          bottom: 10,
          right: 10,
          height: 50,
          backgroundColor:
            result === "Added" ? Colors.ternary : Colors.secondary,
        },
        style,
      ]}
      icon={<Icon loading={loading} success={result} error={!!error} />}
    />
  );
}
