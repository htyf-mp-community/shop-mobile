import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Input, Button } from "components";
import { useCallback } from "react";
import { Keyboard, StyleProp, View, ViewStyle } from "react-native";
import useSaveUserSettings from "@navigation/Screens/AccountSettings/useSaveUserSettings";

interface SettingsSheetProps {
  option: "NAME" | "ADDRESS" | "PHONE_NUMBER" | "SURNAME" | "";
  text: string;
  setText: (text: string) => void;
  onSheetClose: () => void;
  sheetRef: any;
}

const buttonStyles: StyleProp<ViewStyle> = {
  margin: 10,
  justifyContent: "center",
  alignItems: "center",
  width: "60%",
  backgroundColor: "transparent",
};

export default function SettingsBottomSheet({
  option,
  text,
  setText,
  onSheetClose,
  sheetRef,
}: SettingsSheetProps) {
  const { onSave } = useSaveUserSettings(onSheetClose);
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0.75}
      />
    ),
    []
  );

  return (
    <BottomSheet
      backgroundStyle={{ backgroundColor: "#131d33" }}
      handleIndicatorStyle={{ backgroundColor: "white" }}
      style={{ padding: 10 }}
      ref={sheetRef}
      index={-1}
      enablePanDownToClose
      snapPoints={["50%", "75%"]}
      onClose={() => Keyboard.dismiss()}
      backdropComponent={renderBackdrop}
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
          style={buttonStyles}
          onPress={() => onSave(option.toLowerCase(), text)}
        />
      </View>
    </BottomSheet>
  );
}
