import {
  Text,
  Dimensions,
  View,
  ActivityIndicator,
  Platform,
} from "react-native";

import Animated, { SlideInDown } from "react-native-reanimated";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks/hooks";
import styles from "../styles";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../../../../components";
import { useNavigation } from "@react-navigation/native";
import { useNavigationProps } from "../../../../@types/types";
import { Entypo } from "@expo/vector-icons";
import { useEffect } from "react";
import { checkoutActions } from "../../../../redux/Checkout";
const { width } = Dimensions.get("screen");

export default function Modal() {
  const state = useAppSelector((state) => state.checkout);

  const dispatch = useAppDispatch();

  const navigation = useNavigation<useNavigationProps>();

  useEffect(() => {
    return () => {
      dispatch(checkoutActions.destroySession());
    };
  }, []);

  if (state.status === "PREPARING") return null;

  return (
    <Animated.View
      entering={SlideInDown}
      exiting={SlideInDown}
      style={styles.modal}
    >
      <View style={styles.innerModal}>
        {state.status === "FINISHED" && (
          <>
            <Text style={[styles.innerText, { color: "lightgreen" }]}>
              Charged ${state.ammountCharged / 100}
            </Text>
            <Ionicons name="checkmark-circle" size={300} color="lightgreen" />
            <Button
              fontStyle={{ color: "#000" }}
              style={{
                backgroundColor: "lightgreen",
                width: width * 0.8,
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("Home")}
              text="Return home"
            />
          </>
        )}
        {state.status === "PENDING" && (
          <>
            <Text style={[styles.innerText]}>Payment in process</Text>
            <ActivityIndicator
              size={Platform.OS === "android" ? 120 : "large"}
              color="white"
            />
          </>
        )}

        {state.status === "FAILED" && (
          <>
            <Text style={[styles.innerText, { color: "red" }]}>
              Payment Failed
            </Text>
            <Entypo name="circle-with-cross" size={300} color="red" />
            <Button
              fontStyle={{ color: "white" }}
              style={{
                backgroundColor: "red",
                width: width * 0.8,
                justifyContent: "center",
              }}
              onPress={() => navigation.navigate("Home")}
              text="Return home"
            />
          </>
        )}
      </View>
    </Animated.View>
  );
}
