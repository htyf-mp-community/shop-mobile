import * as Icons from "@expo/vector-icons";
import { TagProps } from "components/ui/Tag/Tag";

export default [
  {
    text: "Premium",
    leftIcon: (
      <Icons.MaterialCommunityIcons name="gold" size={20} color="#fff" />
    ),
  },
  {
    text: "Best Seller",
    leftIcon: (
      <Icons.MaterialCommunityIcons name="crown" size={20} color="#fff" />
    ),
  },
  {
    text: "New",
    leftIcon: (
      <Icons.MaterialCommunityIcons name="new-box" size={20} color="#fff" />
    ),
  },
  {
    text: "Hot",
    leftIcon: (
      <Icons.MaterialCommunityIcons name="fire" size={20} color="#fff" />
    ),
  },
  {
    text: "Trending",
    leftIcon: (
      <Icons.MaterialCommunityIcons name="trending-up" size={20} color="#fff" />
    ),
  },
] as TagProps[];
