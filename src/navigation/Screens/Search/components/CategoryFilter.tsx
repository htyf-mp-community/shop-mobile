import FilterOptionContainer from "./FilterOptionContainer";
import { Button, IconButton, Modal } from "components";
import { View, Text, FlatList } from "react-native";
import { Colors } from "constants/styles";
import { useAppDispatch, useAppSelector } from "utils/hooks/hooks";
import { searchActions } from "redux/Search/search";
import { AntDesign } from "@expo/vector-icons";
import layout from "constants/layout";
import useBoolean from "utils/hooks/useBoolean";
import useFetch from "utils/hooks/useFetch";

export default function CategoryFilter() {
  const { state, toggle } = useBoolean(false);
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.search);
  const { data } = useFetch<string[]>("/products/categories");

  const handleSelectCategory = (category: string) => {
    dispatch(
      searchActions.setFilter({
        key: "category",
        value: category,
      })
    );
    toggle();
  };

  return (
    <FilterOptionContainer title="Select category">
      <Modal
        onBackdropPress={toggle}
        onBackButtonPress={toggle}
        isVisible={state}
      >
        <Text style={{ color: "#fff", fontSize: 25, fontWeight: "bold" }}>
          Categories
        </Text>

        <FlatList
          style={{ marginTop: 25 }}
          data={data}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Button
              onPress={() => handleSelectCategory(item)}
              style={{
                justifyContent: "flex-start",
                backgroundColor:
                  filters.category === item
                    ? Colors.primary100
                    : Colors.primary,
              }}
              text={item}
            />
          )}
        />
      </Modal>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: Colors.primary100,
          borderRadius: 2.5,
          padding: 5,
        }}
      >
        <Button
          onPress={toggle}
          text={filters.category || "All categories"}
          style={{
            backgroundColor: Colors.primary100,
            justifyContent: "space-between",
            width: layout.screen.width - 20 - 40 - 10,
          }}
        />
        <IconButton
          onPress={() => dispatch(searchActions.clearFilter("category"))}
          icon={<AntDesign name="close" size={24} color="white" />}
        />
      </View>
    </FilterOptionContainer>
  );
}
