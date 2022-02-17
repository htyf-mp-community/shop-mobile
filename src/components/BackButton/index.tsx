import type { useNavigationProps } from "../../@types/types";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import PulseButton from "components/PulseButton";

export default function BackButton() {
  const navigation = useNavigation<useNavigationProps>();

  return (
    <PulseButton
      icon={<AntDesign name="arrowleft" size={24} color="white" />}
      onPress={() => navigation.goBack()}
    />
  );
}
