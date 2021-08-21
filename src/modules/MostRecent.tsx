import React, { useState, useCallback, useEffect } from "react";

import HorizontalSlider from "../components/HorizontalSlider/HorizontalSlider";
import { ActivityIndicator, Text } from "react-native";
import Product from "./Product";
import { useUser } from "../context/UserContext";
import { API } from "../constants/routes";
import { ProductTypeProps } from "./Product";

interface MostRecentProps {
  path: string;
  title: string;
}

export default function MostRecent({ path, title }: MostRecentProps) {
  const { user } = useUser();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const FetchAllProducts = useCallback(async () => {
    try {
      setLoading(true);

      const response = await fetch(API + path, {
        headers: {
          token: user.token,
        },
      });
      const data = await response.json();
      if (data !== null) {
        setData(data);
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    FetchAllProducts();
  }, []);

  return (
    <HorizontalSlider title={title}>
      {loading && (
        <ActivityIndicator
          size="large"
          color="#fff"
          style={{
            position: "absolute",
            top: 100,
            left: 100,
          }}
        />
      )}
      {!!error && <Text>Error</Text>}
      {data?.map((el: ProductTypeProps) => (
        <Product key={el.prod_id} {...el} />
      ))}
    </HorizontalSlider>
  );
}
