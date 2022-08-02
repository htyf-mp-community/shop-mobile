import { ScrollView, View } from "react-native";
import styles from "../styles";
import Delivery from "modules/Delivery";
import { Available } from "components";
import Banner from "../../Banner";
import Color from "color";

interface TagsListProps {
  quantity?: number;
  category?: string;
}

export default function TagsList({ category, quantity }: TagsListProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.row, { paddingBottom: 10 }]}
    >
      <Delivery />
      <View style={{ marginRight: 10 }} />
      <Available quantity={quantity || 0} />
      <View style={{ marginRight: 10 }} />
      <Banner
        text="Premium product"
        color="red"
        backgroundColor={Color("red").alpha(0.15).string()}
      />
      <Banner
        text={category || ""}
        color="white"
        backgroundColor={Color("gray").alpha(0.1).string()}
      />
    </ScrollView>
  );
}
