import React, { useCallback, useRef } from "react";
import AuthForm from "@modules/AuthForm/AuthForm";
import useAuth from "utils/hooks/useAuth";
import { Text, ActivityIndicator, View } from "react-native";
import useColorTheme from "@utils/context/ThemeContext";
import { Button, Container } from "@components/index";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Fonts } from "constants/styles";
import Color from "color";

export default function LoginScreen() {
  const sheetRef = useRef<BottomSheet>(null);

  const { onLogin, error, loading, onClear } = useAuth("login", {
    onStart: () => {
      sheetRef.current?.snapToIndex(1);
    },
  });
  const { theme } = useColorTheme();

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0.75}
        {...props}
      />
    ),
    []
  );

  return (
    <Container centerVertical>
      <AuthForm onSubmit={onLogin} header="Login" />

      <BottomSheet
        ref={sheetRef}
        index={-1}
        backgroundStyle={{ backgroundColor: "#131d33" }}
        handleIndicatorStyle={{ backgroundColor: "white" }}
        snapPoints={["50%", "51%"]}
        backdropComponent={renderBackdrop}
      >
        <View
          style={{
            height: "100%",
            justifyContent: "space-between",
            padding: 10,
          }}
        >
          <View>
            <Text
              style={{
                fontSize: 30,
                color: theme.text,
                fontFamily: Fonts.PoppinsBold,
              }}
            >
              {loading ? "Procesing" : "Something went wrong"}
            </Text>

            {loading ? (
              <View
                style={{
                  width: "100%",
                  height: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size={40} color="white" />
              </View>
            ) : (
              <Text
                style={{
                  color: Color(theme.text).alpha(0.8).string(),
                  fontSize: 19,
                  fontFamily: Fonts.PoppinsBold,
                }}
              >
                {error}
              </Text>
            )}
          </View>

          <Button
            size={"xl"}
            callback={() => {
              onClear();
              sheetRef.current?.close();
            }}
            text="Try again"
            variant="primary"
          />
        </View>
      </BottomSheet>
    </Container>
  );
}
