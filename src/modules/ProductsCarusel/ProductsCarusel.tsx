import React, { useState, useCallback, useEffect } from "react";
import HorizontalSlider from "../../components/HorizontalSlider/HorizontalSlider";
import { ActivityIndicator, Text } from "react-native";
import Product from "../Product/Product";
import { useUser } from "../../context/UserContext";
import { API } from "../../constants/routes";
import { ProductTypeProps } from "../Product/Product";
import { Colors } from "../../constants/styles";
import axios from "axios";
import RemoveProductsRepetition from "../../functions/RemoveRepetition";

interface MostRecentProps {
  path: string;
  title: string;
  sharedID: string;
  refresh: boolean;
}

export default function ProductsCarusel({
  path,
  title,
  sharedID,
  refresh,
}: MostRecentProps) {
  const { user } = useUser();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const FetchAllProducts = useCallback(async () => {
    try {
      const { data } = await axios.get(`${API}${path}`, {
        headers: {
          token: user.token,
        },
      });
      if (data !== null) {
        setData(RemoveProductsRepetition(data));
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    FetchAllProducts();
  }, [refresh]);

  return (
    <HorizontalSlider title={title}>
      {loading && (
        <ActivityIndicator
          size="large"
          color={Colors.text}
          style={{
            position: "absolute",
            top: 100,
            left: 100,
          }}
        />
      )}
      {!!error && <Text>Error</Text>}

      {typeof data !== "undefined" &&
        data?.map((product: ProductTypeProps, index: number) => (
          <Product
            key={`${product.prod_id}.${index}`}
            {...product}
            sharedID={sharedID}
          />
        ))}
    </HorizontalSlider>
  );
}
