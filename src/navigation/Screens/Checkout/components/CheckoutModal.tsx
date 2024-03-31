import { useNavigation } from "@react-navigation/native";
// import { CardField, CardFieldInput } from "@stripe/stripe-react-native";
import { useNavigationProps } from "/@types/types";
import { Button, Modal } from "components";
import { Colors } from "constants/styles";
import { useState, useRef, useEffect } from "react";
import { Text, ActivityIndicator, View, Keyboard } from "react-native";
import { useAppSelector } from "utils/hooks/hooks";
import styles from "../styles";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

interface ModalProps {
  isVisible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

export default function CheckoutModal({
  isVisible,
  onCancel,
  onSubmit,
}: ModalProps) {
  const { status, paymentError } = useAppSelector((st) => st.checkout);
  const navigation = useNavigation<useNavigationProps>();

  const [isCardValid, setIsCardValid] = useState(false);

  const handleValidateCard = (input: any) => {
    if (input.complete) {
      setIsCardValid(true);
    }
  };

  const sheetRef = useRef<BottomSheet | null>(null);

  useEffect(() => {
    if (isVisible) sheetRef.current?.snapToIndex(0);
  }, [isVisible]);

  return (
    <BottomSheet
      handleIndicatorStyle={{
        backgroundColor: "#fff",
      }}
      backgroundStyle={{
        backgroundColor: Colors.primary_light,
      }}
      style={{
        padding: 10,
      }}
      index={-1}
      onClose={() => {
        onCancel();
        // Keyboard.dismiss();
      }}
      ref={sheetRef}
      snapPoints={["30%"]}
      enablePanDownToClose
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
        />
      )}
    >
      {status === "PREPARING" && (
        <>
          <Text style={styles.heading}>Enter your card credentials</Text>

          {/* <CardField
            onCardChange={handleValidateCard}
            style={{ height: 60, marginVertical: 10 }}
            cardStyle={{
              backgroundColor: Colors.primary,
              textColor: "white",
              placeholderColor: "lightgray",
              borderRadius: 10,
            }}
          /> */}

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button
              callback={onSubmit}
              disabled={!isCardValid}
              text="Pay"
              type="contained"
              color="primary"
              size="xl"
              style={{ marginTop: 10, width: "100%", borderRadius: 50 }}
            />
          </View>
        </>
      )}

      {status === "PENDING" && (
        <View style={[styles.center, { width: "100%" }]}>
          <ActivityIndicator color="#fff" size={"large"} />
        </View>
      )}

      {status === "FAILED" && (
        <View style={[styles.center, { width: "100%" }]}>
          <Text style={styles.error}>{paymentError}</Text>
        </View>
      )}

      {status === "FINISHED" && (
        <View style={[styles.center, { width: "100%" }]}>
          <Text style={styles.success}>Payment successful</Text>
          <Text
            style={{
              fontSize: 17,
              margin: 10,
              color: Colors.secondary,
            }}
          >
            Thank you for your purchase
          </Text>
          <Button
            style={{ width: "85%" }}
            text="Leave"
            color="ternary"
            size="xl"
            type="contained"
            onPress={() => navigation.navigate("Home")}
          />
        </View>
      )}
    </BottomSheet>
  );
}
