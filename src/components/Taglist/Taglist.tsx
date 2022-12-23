import Tag, { TagProps } from "components/ui/Tag/Tag";
import { FlatList } from "react-native";

import * as Icons from "@expo/vector-icons";

interface TaglistProps {
  readonly tagsList: TagProps[];
}

export default function Taglist({ tagsList }: TaglistProps) {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      data={tagsList}
      keyExtractor={(tag) => tag.text}
      renderItem={({ item, index }) => <Tag index={index + 1} {...item} />}
    />
  );
}
