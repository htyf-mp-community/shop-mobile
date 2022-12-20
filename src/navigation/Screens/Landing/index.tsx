import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, useWindowDimensions, Image, Text } from "react-native";
import { Colors, Fonts } from "../../../constants/styles";
import Button from "../../../components/ui/Button/Button";
import styles from "./styles";
import layout from "constants/layout";
import Color from "color";

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
  return (
    <SafeAreaView style={[styles.container, { padding: 10 }]}>
      <View>
        <Text
          style={{
            fontSize: 45,
            color: Color(Colors.secondary).lighten(0.6).string(),
            fontFamily: Fonts.PoppinsBold,
          }}
        >
          Hello {"\n"}There!
        </Text>
        <Image
          source={require("@assets/Online_shopping_PNG.png")}
          style={{
            width: layout.screen.width - 20,
            height: 450,
          }}
        />
      </View>

      <View style={[styles.block, { width: layout.screen.width }]}>
        <Button
          type="contained"
          fontStyle={{ fontSize: 20 }}
          style={[styles.button, { backgroundColor: Colors.primary_light }]}
          text="Log in"
          callback={onNavigateLogin}
        />
        <Button
          variant="primary"
          type="contained"
          fontStyle={{ fontSize: 20 }}
          style={styles.button}
          text="Create an account"
          callback={onNavigateRegister}
        />
      </View>
    </SafeAreaView>
  );
}
