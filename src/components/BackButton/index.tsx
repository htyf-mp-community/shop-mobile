import { TouchableNativeFeedback, View } from "react-native";
import type { useNavigationProps } from "../../@types/types";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "@constants/styles";

export default function BackButton() {
  const navigation = useNavigation<useNavigationProps>();
  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple("rgba(255,255,255,0.2)", true)}
      onPress={() => navigation.goBack()}
    >
      <View
        style={{
          padding: 5,
          backgroundColor: Colors.primary,
          width: 40,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AntDesign name="arrowleft" size={24} color="white" />
      </View>
    </TouchableNativeFeedback>
  );
}
