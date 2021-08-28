import React, { useState, useCallback, useEffect } from "react";
import HorizontalSlider from "../../components/HorizontalSlider/HorizontalSlider";
import { View, Text } from "react-native";
import Product from "../Product/Product";
import { useUser } from "../../context/UserContext";
import { API } from "../../constants/routes";
import { ProductTypeProps } from "../Product/Product";
import axios from "axios";
import RemoveProductsRepetition from "../../functions/RemoveRepetition";
import ProductLoader from "../ProductLoader/ProductLoader";
import styles from "../Product/styles";
import { Colors } from "../../constants/styles";

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
      setLoading(true);
      const { data } = await axios.get(`${API}${path}`, {
        headers: {
          token: user.token,
        },
      });
      if (data !== null && data.message !== "Token expired") {
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
      {loading && <ProductLoader />}
      {!!error && (
        <View style={styles.container}>
          <View
            style={[
              styles.product,
              { justifyContent: "center", alignItems: "center" },
            ]}
          >
            <Text style={{ fontFamily: "PoppinsBold", color: Colors.text }}>
              {error || "Failed to fetch products"}
            </Text>
          </View>
        </View>
      )}

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
