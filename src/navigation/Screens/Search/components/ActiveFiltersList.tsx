import { Button } from "components";
import { Colors } from "constants/styles";
import { ScrollView, View, Text } from "react-native";

import { Entypo } from "@expo/vector-icons";
import { useAppSelector } from "utils/hooks/hooks";

interface ActiveFiltersListProps {
  handleOpenFilters: () => void;
}

export default function ActiveFiltersList({
  handleOpenFilters,
}: ActiveFiltersListProps) {
  const { filters } = useAppSelector((state) => state.search);

  const filtersList = Object.entries(filters).map(([key, value]) => (
    <View
      key={key}
      style={{
        padding: 5,
        backgroundColor: Colors.primary100,
        marginRight: 5,
        paddingHorizontal: 10,
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "#fff" }}>
        {key}: {typeof value === "string" ? value : `${value.min}-${value.max}`}
      </Text>
    </View>
  ));

  return (
    <View>
      <ScrollView
        style={{ marginTop: 10 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <Button
          onPress={() => handleOpenFilters()}
          icon={
            <Entypo
              name="dots-three-vertical"
              size={16}
              style={{ marginLeft: 5 }}
              color="white"
            />
          }
          text="Filters"
          fontStyle={{ fontSize: 16 }}
          style={{
            marginLeft: 15,
            marginRight: 5,
            backgroundColor: Colors.primary100,
            width: 80,
            borderRadius: 2.5,
          }}
        />

        {filtersList}
      </ScrollView>
    </View>
  );
}
