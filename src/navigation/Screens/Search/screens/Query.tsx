import { useIsFocused } from "@react-navigation/native";
import ScreenContainer from "components/ScreenContainer";
import InputHeaderControll from "../components/InputHeaderControll";
import useListenBackPress from "utils/hooks/useListenBackPress";
import { VirtualizedList, Text, View } from "react-native";
import useRecent from "../hooks/useRecent";
import { useDispatch } from "react-redux";
import { searchActions } from "redux/Search/search";
import { SearchNestedScreenProps } from "/@types/types";
import SearchHistory from "../components/SearchHistory";

export default function Query({
  navigation,
}: SearchNestedScreenProps<"Query">) {
  const isFocused = useIsFocused();
  useListenBackPress(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    return true;
  }, [isFocused]);

  const { appendRecent, recent, removeRecent } = useRecent();

  const dispatch = useDispatch();

  function handleSetQuery(text: string) {
    dispatch(searchActions.setText(text));
    navigation.goBack();
  }

  return (
    <ScreenContainer>
      <InputHeaderControll
        mode="edit"
        beforeSubmitEditing={(text) => appendRecent(text!)}
      />

      <View style={{ padding: 15 }}>
        {/*  <Text style={{ color: "#fff", fontSize: 20 }}>Proposed searches</Text> */}
        <View>
          <Text style={{ color: "#fff", fontSize: 20, paddingBottom: 10 }}>
            Recently searched
          </Text>

          <VirtualizedList
            data={recent}
            getItem={(data, index) =>
              data[index] as { id: number; text: string }
            }
            getItemCount={(prop) => prop.length}
            keyExtractor={(item: any) => item.id.toString()}
            renderItem={({ item: r }) => (
              <SearchHistory
                recent={r}
                handleRemoveQuery={removeRecent}
                handleSetQuery={handleSetQuery}
              />
            )}
          />
        </View>
      </View>
    </ScreenContainer>
  );
}
