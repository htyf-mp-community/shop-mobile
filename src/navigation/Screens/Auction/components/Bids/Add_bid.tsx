import { Button, Input } from "components";
import { Padding } from "constants/styles";
import { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    width,
    padding: Padding.medium,
    flexDirection: "row",
  },
  input: {
    width: width / 3,
    textAlign: "center",
  },
  button: {
    marginBottom: 12,
    width: width / 2.5,
    justifyContent: "center",
    flexDirection: "row-reverse",
    marginRight: 10,
    alignItems: "center",
  },
});

interface AddBidProps {
  highest: number;
  auction_id: string;
  onBid: (amount: number, auction_id: string) => void;
  isLoading?: boolean;
}

export default function Addbid({
  highest,
  onBid,
  auction_id,
  isLoading = false,
}: AddBidProps) {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  function handleBidSubmit() {
    onBid(+value, auction_id);

    setValue("");
    setTouched(false);
  }

  return (
    <View style={styles.container}>
      <Button
        disabled={isLoading}
        color="ternary"
        type="contained"
        style={[
          styles.button,
          {
            width: 65,
            marginRight: 0,
            marginLeft: 10,
          },
        ]}
        text="+ $5"
        onPress={() => onBid(highest + 5, auction_id)}
      />
      <Input
        value={value}
        onChangeText={setValue}
        placeholder="custom $"
        style={styles.input}
        keyboardType="number-pad"
        clearButtonMode="while-editing"
        onBlur={() => setTouched(true)}
        error={+value < highest && touched}
      />
      <Button
        disabled={+value <= highest || !touched || isLoading}
        icon={
          <Ionicons
            name="ios-cash-outline"
            style={{ marginRight: 10 }}
            size={24}
            color="#fff"
          />
        }
        onPress={handleBidSubmit}
        text="Bid"
        color="primary"
        type="contained"
        style={styles.button}
      />
    </View>
  );
}
