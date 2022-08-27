import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Button, IconButton } from "components";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "utils/hooks/hooks";
import { searchActions } from "redux/Search/search";

export default function FiltersScreenHeader() {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  return (
    <View
      style={{
        marginTop: 5,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 15,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <IconButton
          onPress={() => navigation.goBack()}
          icon={<AntDesign name="close" size={24} color="white" />}
        />

        <Text style={{ color: "#fff", marginLeft: 10, fontSize: 20 }}>
          Filters
        </Text>
      </View>

      <Button
        onPress={() => dispatch(searchActions.clearAllFilters())}
        text="CLEAR FILTERS"
        fontStyle={{ fontSize: 16 }}
      />
    </View>
  );
}
