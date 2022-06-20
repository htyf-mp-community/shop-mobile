import React from "react";
import { ActivityIndicator, View, Text } from "react-native";
import useCheckout from "utils/hooks/useCheckout";
import styles from "./styles";
import { Button, Header } from "components";
import Form from "./components/Form";

import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { CardForm } from "@stripe/stripe-react-native";
import { Colors } from "constants/styles";
import { useAppSelector } from "utils/hooks/hooks";

export default function Checkout() {
  const { purchase } = useCheckout();

  const { status } = useAppSelector((st) => st.checkout);

  const sheetRef = React.useRef<BottomSheet | null>(null);

  const renderBackdrop = React.useCallback(
    (props) => (
      <BottomSheetBackdrop
        disappearsOnIndex={-1}
        appearsOnIndex={0.75}
        {...props}
      />
    ),
    []
  );

  function onSubmit() {
    sheetRef.current?.snapToIndex(1);
  }

  return (
    <View style={styles.container}>
      <Header />

      <Form onSubmit={onSubmit} />

      <BottomSheet
        backgroundStyle={{ backgroundColor: "#131d33" }}
        handleIndicatorStyle={{ backgroundColor: "white" }}
        backdropComponent={renderBackdrop}
        ref={sheetRef}
        snapPoints={[300, 301]}
        index={-1}
      >
        {status === "PREPARING" ? (
          <>
            <CardForm
              style={{ height: 200 }}
              cardStyle={{ backgroundColor: Colors.primary }}
            />
            <Button
              variant="primary"
              size="xl"
              style={{ margin: 10 }}
              text="Purchase"
              callback={() => purchase()}
            />
          </>
        ) : (
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
            }}
          ></View>
        )}
      </BottomSheet>
    </View>
  );
}
