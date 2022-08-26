import { Button } from "components";
import { Colors } from "constants/styles";
import { ScrollView, View, Text } from "react-native";

import { Entypo } from "@expo/vector-icons";

interface ActiveFiltersListProps {
  filters: any[];
  handleOpenFilters: () => void;
}

export default function ActiveFiltersList({
  filters,
  handleOpenFilters,
}: ActiveFiltersListProps) {
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

        {[0, 1, 2, 4, 5, 6, 7].map((filter) => (
          <View
            key={filter}
            style={{
              padding: 5,
              backgroundColor: Colors.primary100,
              marginRight: 5,
              paddingHorizontal: 10,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "#fff" }}>Filter</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
