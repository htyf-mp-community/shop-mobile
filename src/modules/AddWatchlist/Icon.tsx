import { MaterialCommunityIcons } from "@expo/vector-icons";
interface IconProps {
  state: "IN" | "NOT" | "";
  iconColor?: string;
}

export default function Icon({ state, iconColor = "#fff" }: IconProps) {
  return (
    <MaterialCommunityIcons
      name={state === "IN" ? "cards-heart" : "cards-heart-outline"}
      size={27}
      color={state === "IN" ? iconColor : "#fff"}
    />
  );
}
