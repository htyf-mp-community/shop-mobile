import React from "react";
import { View, Image, Text } from "react-native";
import { Colors, Fonts } from "../../../constants/styles";
import Button from "../../../components/ui/Button/Button";
import styles from "./styles";
import layout from "constants/layout";
import Color from "color";
import ScreenContainer from "components/ui/ScreenContainer";
import Svg, { Path } from "react-native-svg";

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
    <ScreenContainer style={[styles.container]}>
      <View
        style={{
          justifyContent: "space-around",
          height: layout.screen.height * 0.6,
          width: "100%",
          alignItems: "center",
          flex: 1,
        }}
      >
        <Image
          source={require("@assets/Online_shopping_PNG.png")}
          style={{
            width: layout.screen.width,
            height: layout.screen.height / 1.5,
            zIndex: 100,
          }}
        />

        <Svg
          style={{
            zIndex: 4,
            position: "absolute",
            top: layout.screen.height / 2 - 100,
            transform: [
              {
                scale: 2.5,
              },
            ],
          }}
        >
          <Path
            fill="#FF0066"
            d="M29.2,-47.8C40.7,-43.9,54.9,-41.9,63.1,-34.2C71.2,-26.6,73.4,-13.3,69.5,-2.3C65.5,8.7,55.4,17.4,47.9,26.2C40.4,35.1,35.5,44.1,28,54C20.4,63.8,10.2,74.6,0.5,73.8C-9.2,72.9,-18.4,60.4,-31.3,53.6C-44.2,46.8,-60.7,45.7,-69.6,37.7C-78.5,29.7,-79.8,14.8,-80,-0.1C-80.3,-15.1,-79.4,-30.3,-70.4,-38C-61.4,-45.8,-44.1,-46.1,-31,-49.2C-17.9,-52.2,-9,-57.8,-0.1,-57.7C8.8,-57.6,17.7,-51.8,29.2,-47.8Z"
            transform="translate(200 160)"
          />
        </Svg>
      </View>

      <View style={[styles.block, { width: layout.screen.width }]}>
        <Button
          type="contained"
          fontStyle={{ fontSize: 20 }}
          style={[
            styles.button,
            { backgroundColor: "#FF0056", borderRadius: 50 },
          ]}
          text="Login"
          callback={onNavigateLogin}
        />
        <Button
          variant="primary"
          type="contained"
          fontStyle={{ fontSize: 20 }}
          style={[styles.button, { borderRadius: 50 }]}
          text="Create account"
          callback={onNavigateRegister}
        />
      </View>
    </ScreenContainer>
  );
}
