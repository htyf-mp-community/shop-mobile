import React from "react";
import { Text, View } from "react-native";
import useCheckout from "./hooks/useCheckout";
import styles from "./styles";
import { Button, Header } from "components";
import Form from "./components/Form";

import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { CardField, CardForm } from "@stripe/stripe-react-native";
import { Colors, Fonts } from "constants/styles";
import { useAppSelector } from "utils/hooks/hooks";

export default function Checkout() {
  const { purchase, total } = useCheckout(true);

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
      <Header>
        <Text style={{ color: "#fff", fontSize: 20, padding: 10 }}>
          Total ${total === 0 ? "Loading..." : total.toFixed(2)}
        </Text>
      </Header>

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
            <CardField
              style={{
                margin: 10,
                height: 60,
                alignItems: "center",
              }}
              cardStyle={{
                textColor: "white",
                backgroundColor: Colors.primary,
                fontFamily: Fonts.PoppinsRegular,
                placeholderColor: "#e3e3e3",
              }}
              postalCodeEnabled
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
