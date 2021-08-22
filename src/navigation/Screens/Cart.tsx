import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useUser } from "../../context/UserContext";
import { API } from "../../constants/routes";
import { Colors } from "../../constants/styles";
import Products from "../../modules/Product";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import Purchase from "../../modules/Purchase";
import { ReturnButton } from "./ProductDetails";

const { width: SCREEN_WIDTH } = Dimensions.get("screen");

export default function Cart({ _, navigation }: any) {
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
      <View style={styles.header}>
        <ReturnButton navigation={navigation} color="#fff" />
        <Text style={styles.heading}>Cart</Text>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : (
        <ScrollView bounces>
          {!error &&
            !isLoading &&
            data.map((el: any, i: number) => {
              return (
                <View key={i}>
                  <Products
                    {...el}
                    route="Cart"
                    deleteFn={() => RemoveCartProduct(el.cart_id)}
                  />
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      position: "absolute",
                      zIndex: 3,
                      right: 20,
                      fontSize: 25,
                    }}
                  >
                    {el.ammount}
                  </Text>
                </View>
              );
            })}
        </ScrollView>
      )}
      <Purchase cart={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  heading: {
    fontSize: 18,
    color: "white",
    marginRight: 20,
    fontWeight: "bold",
  },
  header: {
    width: SCREEN_WIDTH,
    height: 60,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
