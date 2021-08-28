import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Dimensions,
  RefreshControl,
} from "react-native";
import { useUser } from "../../context/UserContext";
import { API } from "../../constants/routes";
import { Colors, h2, radius } from "../../constants/styles";
import Products from "../../modules/Product/Product";
import { useEffect } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";
import Purchase from "../../modules/Purchase/Purchase";
import { wait } from "./Home";
import SvgComponent from "../../components/Svgs/Svgs";
import { cart } from "../../assets/emptyCart";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("screen");

export default function Cart() {
  const { user } = useUser();
  const isFocused = useIsFocused();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [deleted, setDeleted] = useState(0);

  async function RemoveCartProduct(cart_id: number) {
    try {
      const { data } = await axios.delete(API + "/cart/" + cart_id, {
        headers: {
          token: user.token,
        },
      });

      if (data.status === "Deleted") {
        setDeleted(deleted + 1);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [refresh, setRefresh] = useState(false);
  const [refetch, setRefetch] = useState(0);

  const RefreshCart = () => {
    setRefetch(refetch + 1);
  };

  const onRefresh = useCallback(() => {
    setRefresh(true);
    wait(1000).then(() => {
      setRefresh(false);
    });
  }, []);

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
  }, [deleted, isFocused, refresh, refetch]);

  return (
    <View style={styles.container}>
      {data.length === 0 && (
        <View
          style={{
            width: SCREEN_WIDTH,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={h2}>Add Something</Text>
          <SvgComponent svg={cart} size={300} />
        </View>
      )}
      <ScrollView
        bounces
        style={{
          marginTop: 15,
          height: SCREEN_HEIGHT * 0.9,
          position: "relative",
        }}
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
        }
      >
        {typeof data !== "undefined" &&
          data.map((prod: any, i: number) => {
            return (
              <View key={i} style={{ position: "relative" }}>
                <Products
                  {...prod}
                  route="Cart"
                  deleteFn={() => RemoveCartProduct(prod.cart_id)}
                  sharedID="CartItems"
                  RefetchCart={RefreshCart}
                />
                <Text style={styles.text}>{prod.ammount}</Text>
              </View>
            );
          })}
      </ScrollView>

      <Purchase cart={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.91,
    backgroundColor: Colors.primary,
  },
  text: {
    width: 45,
    height: 45,
    color: Colors.text,
    fontFamily: "PoppinsMedium",
    position: "absolute",
    zIndex: 3,
    right: 15,
    fontSize: 25,
    padding: 5,
    top: 5,
    borderRadius: radius.medium,
    backgroundColor: Colors.secondary,
    textAlign: "center",
  },
});
