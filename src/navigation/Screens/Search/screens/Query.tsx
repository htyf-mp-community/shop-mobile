import { useIsFocused, useNavigation } from "@react-navigation/native";
import ScreenContainer from "components/ScreenContainer";
import InputHeaderControll from "../components/InputHeaderControll";
import useListenBackPress from "utils/hooks/useListenBackPress";
import { Text, View } from "react-native";

export default function Query() {
  const navigation = useNavigation();

  const isFocused = useIsFocused();
  useListenBackPress(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    return true;
  }, [isFocused]);

  return (
    <ScreenContainer>
      <InputHeaderControll mode="edit" />

      <View style={{ padding: 15 }}>
        <Text style={{ color: "#fff", fontSize: 20 }}>Proposed searches</Text>
        <Text style={{ color: "#fff", fontSize: 20 }}>Recently searched</Text>
      </View>
    </ScreenContainer>
  );
}
