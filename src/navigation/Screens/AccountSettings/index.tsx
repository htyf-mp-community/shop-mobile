import React, { useLayoutEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import useColorTheme from "@context/ThemeContext";
import styles from "./AccountSettings.styles";
import { Avatar, Container, BackButton } from "@components/index";
import BottomSheet from "@gorhom/bottom-sheet";
import useListenKeyboard from "utils/hooks/useListenKeyboard";
import useFetch from "utils/hooks/useFetch";
import Block from "./components/Block";
import SettingsBottomSheet from "modules/SettingsBottomSheet";

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

      <SettingsBottomSheet
        option={option}
        onSheetClose={onSheetClose}
        setText={setText}
        text={text}
        sheetRef={sheetRef}
      />
    </Container>
  );
}
