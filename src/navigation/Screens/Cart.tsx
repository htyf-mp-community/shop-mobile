import React from "react";
import { View, StyleSheet, Text } from "react-native";

import { useUser } from "../../context/UserContext";
import { API } from "../../constants/routes";
import { h1 } from "../../constants/styles";
import { Colors } from "../../constants/styles";

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

  /* const { data, isLoading, error } = useQuery("fetch cart products", () =>
    FetchCart(user.token)
  );
 */
  return (
    <View style={styles.container}>
      <Text style={[h1, { padding: 10 }]}>Cart</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
});
