import Button from "../../components/Button/Button";
import React from "react";
import { useUser } from "@utils/context/UserContext";
import { Modal } from "components";

import { Text } from "react-native";

import useBoolean from "utils/hooks/useBoolean";

export default function SignOut() {
  const { RemoveUser } = useUser();

  const { state, positive, negative } = useBoolean();

  return (
    <>
      <Modal
        vissible={state}
        onDismiss={negative}
        onAccept={RemoveUser}
        onCancel={negative}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 30,
            fontFamily: "PoppinsBold",
            textAlign: "center",
          }}
        >
          Hey
        </Text>
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontFamily: "PoppinsRegular",
            textAlign: "center",
          }}
        >
          Are you sure you want to signout?
        </Text>
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
