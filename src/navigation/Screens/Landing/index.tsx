import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, View, Text, ImageBackground } from "react-native";
import { Colors } from "../../../constants/styles";
import Button from "../../../components/Button/Button";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  block: {
    margin: 10,
    position: "relative",
  },
  text: {
    color: Colors.text,
    fontSize: 18,
    marginTop: 5,
  },
  button: {
    marginBottom: 15,
    justifyContent: "center",
    borderRadius: 15,
    padding: 20,
  },
});

export default function Landing({ navigation }: any) {
  function onNavigateLogin() {
    navigation.navigate("Auth", {
      screen: "Login",
    });
  }

  function onNavigateRegister() {
    navigation.navigate("Auth", { screen: "Register" });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require("../../../assets/blob-scene-haikei.png")}
        resizeMode="cover"
        style={StyleSheet.absoluteFillObject}
      />
      <View style={{ zIndex: 2 }}>
        <View style={styles.block}>
          <Text
            style={[
              styles.text,
              { fontSize: 100, marginLeft: 10, fontWeight: "bold" },
            ]}
          >
            Join us
          </Text>
          <Text style={[styles.text, { padding: 10 }]}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore
            labore dolor tempore ab rerum commodi amet architecto incidunt,
            blanditiis obcaecati qui
          </Text>
        </View>
        <View style={[styles.block]}>
          <Button
            fontStyle={{ fontSize: 20 }}
            style={styles.button}
            text="Create an account"
            callback={onNavigateRegister}
          />
          <Button
            fontStyle={{ fontSize: 20 }}
            style={[styles.button, { backgroundColor: Colors.primary300 }]}
            text="Log in"
            callback={onNavigateLogin}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
