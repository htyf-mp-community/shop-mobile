import { Button, IconButton } from "components";
import { View } from "react-native";
import { Colors } from "constants/styles";
import { AntDesign } from "@expo/vector-icons";

interface SearchHistoryProps {
  /**
   * Sets the query text and navigates back to the search screen.
   */
  handleSetQuery: (text: string) => void;

  /** Removes search history from list */
  handleRemoveQuery: (id: number) => void;

  recent: { id: number; text: string };
}

export default function SearchHistory({
  handleRemoveQuery,
  handleSetQuery,

  recent,
}: SearchHistoryProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.primary_light,
        marginTop: 10,
        justifyContent: "space-between",
      }}
    >
      <Button
        onPress={() => handleSetQuery(recent.text)}
        key={recent.id}
        text={recent.text}
        style={{
          justifyContent: "flex-start",
          padding: 10,
        }}
      />

      <IconButton
        onPress={() => handleRemoveQuery(recent.id)}
        icon={<AntDesign name="close" size={18} color="white" />}
      />
    </View>
  );
}
