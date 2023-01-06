import { useNavigation } from "@react-navigation/native";
import { CardField, CardFieldInput } from "@stripe/stripe-react-native";
import { useNavigationProps } from "/@types/types";
import { Button, Modal } from "components";
import { Colors } from "constants/styles";
import { useState } from "react";
import {
  useWindowDimensions,
  Text,
  ActivityIndicator,
  View,
  Dimensions,
} from "react-native";
import { useAppSelector } from "utils/hooks/hooks";
import styles from "../styles";

interface ModalProps {
  isVisible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

const { height } = Dimensions.get("screen");

export default function CheckoutModal({
  isVisible,
  onCancel,
  onSubmit,
}: ModalProps) {
  const { status, paymentError } = useAppSelector((st) => st.checkout);
  const navigation = useNavigation<useNavigationProps>();

  const [isCardValid, setIsCardValid] = useState(false);

  const handleValidateCard = (input: CardFieldInput.Details) => {
    if (input.complete) {
      setIsCardValid(true);
    }
  };
  return (
    <Modal
      isVisible={isVisible}
      animationIn="zoomIn"
      animationOut="zoomOutUp"
      useNativeDriverForBackdrop
      style={styles.modal}
      deviceHeight={height}
      statusBarTranslucent
      hideModalContentWhileAnimating
    >
      {status === "PREPARING" && (
        <>
          <Text style={styles.heading}>
            Enter your card credentials to complete your purchase
          </Text>

          <CardField
            onCardChange={handleValidateCard}
            style={{ height: 60, marginVertical: 10 }}
            cardStyle={{
              backgroundColor: Colors.primary,
              textColor: "white",
              placeholderColor: "lightgray",
              borderRadius: 10,
            }}
          />

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button
              text="Cancel"
              variant="disabled"
              size="xl"
              callback={onCancel}
              style={{ marginTop: 10, width: "45%" }}
            />
            <Button
              callback={onSubmit}
              disabled={!isCardValid}
              text="Pay"
              type="contained"
              color="primary"
              size="xl"
              style={{ marginTop: 10, width: "45%" }}
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
    </Modal>
  );
}
