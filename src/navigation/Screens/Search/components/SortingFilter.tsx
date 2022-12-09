import FilterOptionContainer from "./FilterOptionContainer";
import { View, ScrollView } from "react-native";
import { Button } from "components";
import { Colors } from "constants/styles";
import { useAppDispatch, useAppSelector } from "utils/hooks/hooks";
import { searchActions } from "redux/Search/search";

const SORTING_OPTIONS = [
  {
    name: "Newest",
    value: "newest",
  },
  {
    name: "Oldest",
    value: "oldest",
  },
  {
    name: "Price: Low to High",
    value: "price_low_to_high",
  },
  {
    name: "Price: High to Low",
    value: "price_high_to_low",
  },
];

export default function SortingFilter() {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.search);

  return (
    <FilterOptionContainer title="Sort">
      <View style={{ height: 50 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {SORTING_OPTIONS.map((option) => (
            <Button
              onPress={() =>
                dispatch(
                  searchActions.setFilter({
                    key: "sorting",
                    value: option.value,
                  })
                )
              }
              style={{
                backgroundColor:
                  filters.sorting === option.value
                    ? Colors.secondary
                    : Colors.primary_light,
                borderRadius: 2.5,
                marginRight: 10,
              }}
              key={option.value}
              text={option.name}
            />
          ))}
        </ScrollView>
      </View>
    </FilterOptionContainer>
  );
}
