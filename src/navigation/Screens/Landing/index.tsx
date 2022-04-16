import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, useWindowDimensions, Image } from "react-native";
import { Colors } from "../../../constants/styles";
import Button from "../../../components/Button/Button";
import styles from "./styles";

export default function Landing({ navigation }: any) {
  function onNavigateLogin() {
    navigation.navigate("Auth", {
      screen: "Login",
    });
  }

  function onNavigateRegister() {
    navigation.navigate("Auth", { screen: "Register" });
  }

  const { width } = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("@assets/Online_shopping_PNG.png")}
        style={{ width, flex: 2 }}
      />

      <View style={[styles.block, { width }]}>
        {/*  <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Button
            style={styles.social}
            icon={<FontAwesome name="facebook" size={24} color="white" />}
          />
          <Button
            style={[styles.social]}
            icon={<FontAwesome name="google" size={24} color="white" />}
          />
          <Button
            style={styles.social}
            icon={<FontAwesome name="apple" size={24} color="white" />}
          />
        </View> */}
        <Button
          variant="primary"
          fontStyle={{ fontSize: 20 }}
          style={styles.button}
          text="Create an account"
          callback={onNavigateRegister}
        />
        <Button
          fontStyle={{ fontSize: 20 }}
          style={[styles.button, { backgroundColor: Colors.primary100 }]}
          text="Log in"
          callback={onNavigateLogin}
        />
      </View>
    </SafeAreaView>
  );
}
