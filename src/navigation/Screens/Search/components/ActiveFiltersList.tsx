import { Button } from "components";
import { Colors } from "constants/styles";
import { ScrollView, View, Text } from "react-native";

import { Entypo } from "@expo/vector-icons";
import { useAppSelector } from "utils/hooks/hooks";
import Ripple from "react-native-material-ripple";

interface ActiveFiltersListProps {
  handleOpenFilters: () => void;
}

export default function ActiveFiltersList({
  handleOpenFilters,
}: ActiveFiltersListProps) {
  const { filters } = useAppSelector((state) => state.search);

  const filtersList = Object.entries(filters).map(([key, value]) => (
    <Ripple
      onPress={() => handleOpenFilters()}
      key={key}
      style={{
        backgroundColor: Colors.primary_light,
        marginRight: 5,
        paddingHorizontal: 15,
        justifyContent: "center",
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#dedede", marginRight: 5 }}>{key}</Text>
      <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 16 }}>
        {typeof value === "string" ? value : `${value.min}-${value.max}`}
      </Text>
    </Ripple>
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
            backgroundColor: Colors.primary_light,
            borderRadius: 20,
            paddingHorizontal: 20,
          }}
        />

        {filtersList}
      </ScrollView>
    </View>
  );
}
