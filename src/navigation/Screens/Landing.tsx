import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import { Dimensions, StyleSheet, View, Text, Image } from "react-native";
import { Colors } from "../../constants/styles";
import Button from "../../components/Button/Button";

import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/core";

interface LandingProps {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any>;
}

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
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

export default function Landing({ route, navigation }: LandingProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: HEIGHT * 0.5,
          backgroundColor: Colors.primary300,
          margin: 10,
        }}
      ></View>
      <View style={{ height: HEIGHT * 0.4 }}>
        <View style={styles.block}>
          <Text
            style={[
              styles.text,
              { fontSize: 50, marginLeft: 10, fontWeight: "bold" },
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
            callback={() => navigation.navigate("Auth", { screen: "Register" })}
          />
          <Button
            fontStyle={{ fontSize: 20 }}
            style={[styles.button, { backgroundColor: Colors.primary300 }]}
            text="Log in"
            callback={() =>
              navigation.navigate("Auth", {
                screen: "Login",
              })
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
