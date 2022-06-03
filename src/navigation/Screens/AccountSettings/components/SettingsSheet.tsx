import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Input, Button } from "components";
import { forwardRef, useCallback, Ref } from "react";
import { Keyboard, View } from "react-native";
import useSaveUserSettings from "../hooks/useSaveUserSettings";
import styles from "../styles";

interface SettingsSheetProps {
  option: "NAME" | "ADDRESS" | "PHONE_NUMBER" | "SURNAME" | "";
  text: string;
  setText: (text: string) => void;
  onSheetClose: () => void;
}

const SettingsSheet = forwardRef(
  (props: SettingsSheetProps, ref: Ref<BottomSheet>) => {
    const { onSave } = useSaveUserSettings(props.onSheetClose);

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
      <BottomSheet
        ref={ref}
        index={-1}
        backgroundStyle={{ backgroundColor: "#131d33" }}
        handleIndicatorStyle={{ backgroundColor: "white" }}
        style={{ padding: 10 }}
        enablePanDownToClose
        snapPoints={["50%", "75%"]}
        onClose={() => Keyboard.dismiss()}
        backdropComponent={renderBackdrop}
      >
        <Input
          value={props.text}
          placeholderColor="#fff"
          onChangeText={props.setText}
          placeholder={props.option.toLowerCase().replace("_", " ")}
          keyboardType={
            props.option === "PHONE_NUMBER" ? "phone-pad" : undefined
          }
          maxLength={props.option === "PHONE_NUMBER" ? 9 : undefined}
        />
        <View style={{ width: "100%", alignItems: "center" }}>
          <Button
            text={`Save ${props.option.toLowerCase().replace("_", " ")}`}
            fontStyle={{ color: "#00D85D" }}
            style={styles.button}
            onPress={() => onSave(props.option.toLowerCase(), props.text)}
          />
        </View>
      </BottomSheet>
    );
  }
);

export default SettingsSheet;
