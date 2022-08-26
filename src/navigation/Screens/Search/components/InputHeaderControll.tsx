import { Pressable, TextInput, View } from "react-native";
import { Colors } from "constants/styles";
import { IconButton } from "components";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "utils/hooks/hooks";
import { searchActions } from "redux/Search/search";

interface InputHeaderControllProps {
  mode: "display" | "edit";
}

export default function InputHeaderControll({
  mode,
}: InputHeaderControllProps) {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const { searchedText } = useAppSelector((state) => state.search);

  const InputContainer = mode === "edit" ? View : Pressable;

  return (
    <View
      style={{
        backgroundColor: Colors.primary100,
        padding: 5,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 15,
        marginTop: 15,
      }}
    >
      <IconButton
        onPress={() => navigation.goBack()}
        icon={<AntDesign name="arrowleft" size={24} color="white" />}
      />
      <InputContainer
        onPress={
          mode === "display" ? () => navigation.push("Query") : undefined
        }
        style={{ flex: 1 }}
      >
        <TextInput
          autoCorrect
          autoFocus={mode === "edit"}
          onSubmitEditing={() => navigation.goBack()}
          onChangeText={(text) => dispatch(searchActions.setText(text))}
          editable={mode === "edit"}
          value={searchedText}
          style={{
            color: "#fff",
            fontSize: 18,
            textDecorationLine: "none",
            flex: 1,
          }}
        />
      </InputContainer>

      <IconButton
        onPress={() => {
          dispatch(searchActions.setText(""));
        }}
        icon={<AntDesign name="close" size={24} color="white" />}
      />
    </View>
  );
}
