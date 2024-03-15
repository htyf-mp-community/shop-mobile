import { MaterialCommunityIcons } from "@expo/vector-icons";
interface IconProps {
  state: "IN" | "NOT" | "";
  iconColor?: string;

  iconSize?: number;
}

export default function Icon({
  state,
  iconColor = "#fff",
  iconSize = 27,
}: IconProps) {
  return (
    <MaterialCommunityIcons
      name={state === "IN" ? "cards-heart" : "cards-heart-outline"}
      size={iconSize}
      color={state === "IN" ? iconColor : "#fff"}
    />
  );
}
