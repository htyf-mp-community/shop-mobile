import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  useWindowDimensions,
} from "react-native";
import { Colors } from "../../../constants/styles";
import Button from "../../../components/Button/Button";
import styles from "./styles";
import { FontAwesome } from "@expo/vector-icons";
import { LandingIcon } from "../../../components";

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
      <ImageBackground
        source={require("../../../assets/landing-bg.png")}
        resizeMode="cover"
        style={StyleSheet.absoluteFillObject}
      />
      <View style={{ zIndex: 2 }}>
        <Text
          style={[
            styles.text,
            { fontSize: 100, marginLeft: 10, fontWeight: "bold" },
          ]}
        >
          Join us
        </Text>
        <LandingIcon width={width} height={400} />

        <View style={[styles.block, { width }]}>
          <Button
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
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
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
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
