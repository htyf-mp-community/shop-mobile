import Button from "../../components/Button/Button";
import React from "react";
import { useUser } from "@utils/context/UserContext";
import { Modal } from "components";
import { Dimensions, Text, View } from "react-native";
import useBoolean from "utils/hooks/useBoolean";
import styles from "./styles";
import useColorTheme from "utils/context/ThemeContext";
import { AntDesign } from "@expo/vector-icons";

const { height } = Dimensions.get("screen");

export default function SignOut() {
  const { RemoveUser } = useUser();

  const { state: isVisible, positive, negative } = useBoolean();

  const { theme } = useColorTheme();

  const color = { color: theme.text };

  return (
    <>
      <Modal
        onBackdropPress={negative}
        isVisible={isVisible}
        animationIn="zoomIn"
        animationOut="zoomOutUp"
        useNativeDriverForBackdrop
        style={styles.modal}
        deviceHeight={height}
        statusBarTranslucent
        hideModalContentWhileAnimating
      >
        <AntDesign
          name="warning"
          size={30}
          color="orange"
          style={styles.icon}
        />
        <Text style={[styles.heading, color]}>Sign out from store</Text>
        <Text style={[styles.subText, { color: theme.textFaded }]}>
          Are you sure you would like to sign out of your Shop account?
        </Text>

        <View style={[styles.row, { marginTop: 50 }]}>
          <Button
            variant="primary"
            size="xl"
            borderRadius="lg"
            text="Cancel"
            style={{ width: "45%" }}
            callback={negative}
          />
          <Button
            borderRadius="lg"
            variant="disabled"
            size="xl"
            text="Sign out"
            style={{ width: "45%" }}
            callback={RemoveUser}
          />
        </View>
      </Modal>

      <Button
        onPress={positive}
        variant="primary"
        size="xl"
        text={"Sign out"}
        style={{
          borderWidth: 1,
          borderColor: "red",
          marginTop: 20,
          marginBottom: 20,
          justifyContent: "center",
        }}
      />
    </>
  );
}
