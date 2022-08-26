import { Button, IconButton } from "components";
import ScreenContainer from "components/ScreenContainer";
import { View, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import useListenBackPress from "utils/hooks/useListenBackPress";

export default function Filters() {
  const navigation = useNavigation();

  const isFocused = useIsFocused();
  useListenBackPress(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }

    return true;
  }, [isFocused]);

  return (
    <ScreenContainer style={{ padding: 10 }}>
      <View
        style={{
          marginTop: 5,
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
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

        <Button text="CLEAR FILTERS" fontStyle={{ fontSize: 16 }} />
      </View>

      <Text style={{ color: "#fff", fontSize: 25, marginTop: 10 }}>Sort</Text>
      <Text style={{ color: "#fff", fontSize: 25, marginTop: 10 }}>
        Select category
      </Text>

      <Text style={{ color: "#fff", fontSize: 25, marginTop: 10 }}>Price </Text>
    </ScreenContainer>
  );
}
