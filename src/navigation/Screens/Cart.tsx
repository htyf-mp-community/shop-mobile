import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useUser } from "../../context/UserContext";
import { API } from "../../constants/routes";
import { h2 } from "../../constants/styles";
import { Colors } from "../../constants/styles";

import Products from "../../modules/Product";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import Purchase from "../../modules/Purchase";

export default function Cart() {
  const { user } = useUser();

  const isFocused = useIsFocused();

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [deleted, setDeleted] = useState(0);

  async function RemoveCartProduct(cart_id: number) {
    try {
      const response = await axios.delete(API + "/cart/" + cart_id, {
        headers: {
          token: user.token,
        },
      });

      if (response.data.status === "Deleted") {
        setDeleted(deleted + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(API + "/cart", {
          headers: {
            token: user.token,
          },
        });
        if (response.data !== null) {
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    })();
  }, [deleted, isFocused]);

  return (
    <View style={styles.container}>
      <Text style={[h2, styles.heading]}>Cart: {data?.length}</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <ScrollView bounces>
          {!error &&
            !isLoading &&
            data.map((el: any, i: number) => {
              return (
                <Products
                  key={i}
                  {...el}
                  route="Cart"
                  deleteFn={() => RemoveCartProduct(el.cart_id)}
                />
              );
            })}
        </ScrollView>
      )}
      <Purchase />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  heading: {
    marginTop: 10,
    padding: 20,
  },
});
