import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useQuery } from "react-query";
import { useUser } from "../../context/UserContext";
import { API } from "../../constants/routes";
import { h2 } from "../../constants/styles";
import { Colors } from "../../constants/styles";

import Products from "../../modules/Product";

async function FetchCart(token: string) {
  const res = await fetch(API + "/cart", {
    headers: {
      token: token,
    },
  });
  return await res.json();
}

export default function Cart() {
  const { user } = useUser();

  // fix or remove react-query from project

  const { data, isLoading, error } = useQuery(
    "fetch cart products",
    () => FetchCart(user.token),
    {
      retryDelay: 1000,
      retry: 3,
    }
  );

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
              return <Products key={i} {...el} />;
            })}
        </ScrollView>
      )}
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
    padding: 10,
  },
});
