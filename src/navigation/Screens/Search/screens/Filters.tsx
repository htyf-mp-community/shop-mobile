import ScreenContainer from "components/ui/ScreenContainer";
import { View } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import useListenBackPress from "utils/hooks/useListenBackPress";
import FiltersScreenHeader from "../components/FiltersScreenHeader";
import SortingFilter from "../components/SortingFilter";
import CategoryFilter from "../components/CategoryFilter";
import PriceFilters from "../components/PriceFilters";
import { Button } from "components";
import { Colors } from "constants/styles";
import useColorTheme from "utils/context/ThemeContext";
import { SearchNestedScreenProps } from "/@types/types";

export default function Filters({
  navigation,
  route,
}: SearchNestedScreenProps<"Filters">) {
  const isFocused = useIsFocused();
  useListenBackPress(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    return true;
  }, [isFocused]);

  const { current } = useColorTheme();

  return (
    <ScreenContainer style={{ padding: 10, justifyContent: "space-between" }}>
      <View>
        <FiltersScreenHeader />

        <SortingFilter />

        <CategoryFilter />

        <PriceFilters />
      </View>

      <Button
        onPress={() => navigation.goBack()}
        text="Show results"
        style={{
          backgroundColor: current === "dark" ? "#fff" : Colors.primary,
          paddingVertical: 15,
        }}
        fontStyle={{ color: Colors.primary, fontWeight: "bold" }}
      />
    </ScreenContainer>
  );
}
