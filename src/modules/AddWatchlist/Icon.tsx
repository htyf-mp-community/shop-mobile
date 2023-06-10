import { AntDesign } from "@expo/vector-icons";
interface IconProps {
  state: "IN" | "NOT" | "";
  iconColor?: string;
}

export default function Icon({ state, iconColor = "#fff" }: IconProps) {
  return (
    <AntDesign
      name={state === "IN" ? "heart" : "hearto"}
      size={26}
      color={state === "IN" ? iconColor : "#fff"}
    />
  );
}
