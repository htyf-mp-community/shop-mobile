import React, { useLayoutEffect, useRef, useState } from "react";
import { View, Text, Keyboard } from "react-native";
import useColorTheme from "@context/ThemeContext";
import styles from "./styles";
import {
  Avatar,
  Container,
  BackButton,
  Input,
  Button,
} from "@components/index";
import BottomSheet from "@gorhom/bottom-sheet";
import useListenKeyboard from "hooks/useListenKeyboard";
import useSaveUserSettings from "./useSaveUserSettings";
import useFetch from "hooks/useFetch";
import Block from "./Block";

type CurrentOptionType = "NAME" | "ADDRESS" | "PHONE_NUMBER" | "SURNAME" | "";

interface Response {
  name: string;
  surname: string;
  address: string;
  phone_number: string;
}

export default function AccountSettings() {
  const { theme } = useColorTheme();
  const [option, setOption] = useState<CurrentOptionType>("");
  const [text, setText] = useState("");
  const sheetRef = useRef<null | BottomSheet>(null);

  const [reload, setReload] = useState(false);

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
    setReload(!reload);
  }

  const { onSave } = useSaveUserSettings(onSheetClose);

  const { data } = useFetch<Response>("/auth/credentials", [reload], {});

  return (
    <Container>
      <View style={{ padding: 15 }}>
        <BackButton />
      </View>
      <View style={{ padding: 20 }}>
        <View style={styles.header}>
          <Text style={[styles.heading, { color: theme.text }]}>Settings</Text>
          <Avatar url={require("@assets/notfound.png")} />
        </View>

        <Block
          text={data?.name}
          label="Name"
          onPress={() => onSheetOpen("NAME")}
        />
        <Block
          text={data?.surname}
          label="Surname"
          onPress={() => onSheetOpen("SURNAME")}
        />
        <Block
          text={data?.address}
          label="Address"
          onPress={() => onSheetOpen("ADDRESS")}
        />
        <Block
          text={data?.phone_number}
          label="Phone number"
          onPress={() => onSheetOpen("PHONE_NUMBER")}
        />
      </View>

      <BottomSheet
        backgroundStyle={{ backgroundColor: "#131d33" }}
        handleIndicatorStyle={{ backgroundColor: "white" }}
        style={{ padding: 10 }}
        ref={sheetRef}
        index={-1}
        enablePanDownToClose
        snapPoints={["50%", "75%"]}
        onClose={() => Keyboard.dismiss()}
      >
        <Input
          value={text}
          placeholderColor="#fff"
          onChangeText={setText}
          placeholder={option.toLowerCase().replace("_", " ")}
          keyboardType={option === "PHONE_NUMBER" ? "phone-pad" : undefined}
          maxLength={option === "PHONE_NUMBER" ? 9 : undefined}
        />
        <View style={{ width: "100%", alignItems: "center" }}>
          <Button
            text={`Save ${option.toLowerCase().replace("_", " ")}`}
            fontStyle={{ color: "#00D85D" }}
            style={styles.button}
            onPress={() => onSave(option.toLowerCase(), text)}
          />
        </View>
      </BottomSheet>
    </Container>
  );
}
