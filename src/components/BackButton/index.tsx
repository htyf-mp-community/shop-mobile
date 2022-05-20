import type { useNavigationProps } from "../../@types/types";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Ripple from "react-native-material-ripple";

export default function BackButton() {
  const navigation = useNavigation<useNavigationProps>();

  return (
    <Ripple onPress={() => navigation.goBack()} style={{ padding: 10 }}>
      <AntDesign name="arrowleft" size={24} color="white" />
    </Ripple>
  );
}
