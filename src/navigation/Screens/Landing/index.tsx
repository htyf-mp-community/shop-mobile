import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, useWindowDimensions, Image } from "react-native";
import { Colors } from "../../../constants/styles";
import Button from "../../../components/Button/Button";
import styles from "./styles";

export default function Landing({ navigation }: any) {
  function onNavigateLogin() {
    navigation.navigate("Login", {
      //  screen: "Login",
    });
  }

  function onNavigateRegister() {
    navigation.navigate(
      "Register"
      //   { screen: "Register" }
    );
  }

  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("@assets/Online_shopping_PNG.png")}
        style={{ width, flex: 2 }}
      />

      <View style={[styles.block, { width }]}>
        <Button
          variant="primary"
          type="contained"
          fontStyle={{ fontSize: 20 }}
          style={styles.button}
          text="Create an account"
          callback={onNavigateRegister}
        />
        <Button
          type="contained"
          fontStyle={{ fontSize: 20 }}
          style={[styles.button, { backgroundColor: Colors.primary_light }]}
          text="Log in"
          callback={onNavigateLogin}
        />
      </View>
    </SafeAreaView>
  );
}
