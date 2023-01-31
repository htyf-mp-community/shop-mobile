import { Button } from "components";
import { Colors } from "constants/styles";
import { useState } from "react";
import { ScrollView } from "react-native";
import Animated, { Layout } from "react-native-reanimated";

export default function Tags(props: { tagName: string }) {
  const [tags, setTags] = useState<string[]>([]);

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{ padding: 5 }}
      style={{ marginBottom: 10 }}
    >
      {Array.from(Array(10).keys()).map((index) => (
        <Animated.View layout={Layout}>
          <Tag tagName={"random"} select={() => {}} />
        </Animated.View>
      ))}
    </ScrollView>
  );
}

export const Tag = (props: {
  tagName: string;
  select: (option: string) => void;
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const bgColor = isSelected ? Colors.accent : Colors.primary_light;

  const handleClick = () => {
    setIsSelected((prev) => !prev);
    props.select(props.tagName);
  };

  return (
    <Button
      onPress={handleClick}
      style={{ backgroundColor: bgColor, marginRight: 10 }}
      text={props.tagName}
    />
  );
};
