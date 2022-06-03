import React, { useLayoutEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import useColorTheme from "@utils/context/ThemeContext";
import styles from "./styles";
import { Container, Header } from "@components/index";
import BottomSheet from "@gorhom/bottom-sheet";
import useListenKeyboard from "utils/hooks/useListenKeyboard";
import Block from "./components/Block";
import SettingsBottomSheet from "navigation/Screens/AccountSettings/components/SettingsSheet";
import { useAppSelector } from "utils/hooks/hooks";

type CurrentOptionType = "NAME" | "ADDRESS" | "PHONE_NUMBER" | "SURNAME" | "";

export default function AccountSettings() {
  const { theme } = useColorTheme();
  const [option, setOption] = useState<CurrentOptionType>("");
  const [text, setText] = useState("");
  const sheetRef = useRef<null | BottomSheet>(null);
  const { status } = useListenKeyboard();

  useLayoutEffect(() => {
    if (status === "open") {
      sheetRef.current?.snapToIndex(0.75);
    }
  }, [status]);

  function onSheetOpen(variant: CurrentOptionType) {
    sheetRef.current?.snapToPosition("50%");
    setText("");
    setOption(variant);
  }

  function onSheetClose() {
    sheetRef.current?.close();
  }
  const { name, surname, phone_number, address } = useAppSelector(
    (state) => state.user.credentials
  );

  return (
    <Container>
      <Header />
      <View style={{ padding: 20 }}>
        <View style={styles.header}>
          <Text style={[styles.heading, { color: theme.text }]}>Settings</Text>
        </View>

        <Block text={name} label="Name" onPress={() => onSheetOpen("NAME")} />
        <Block
          text={surname}
          label="Surname"
          onPress={() => onSheetOpen("SURNAME")}
        />
        <Block
          text={address}
          label="Address"
          onPress={() => onSheetOpen("ADDRESS")}
        />
        <Block
          text={phone_number}
          label="Phone number"
          onPress={() => onSheetOpen("PHONE_NUMBER")}
        />
      </View>

      <SettingsBottomSheet
        option={option}
        onSheetClose={onSheetClose}
        setText={setText}
        text={text}
        ref={sheetRef}
      />
    </Container>
  );
}
