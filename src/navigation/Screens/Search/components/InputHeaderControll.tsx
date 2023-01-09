import { Pressable, TextInput, View } from "react-native";
import { Colors } from "constants/styles";
import { IconButton } from "components";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "utils/hooks/hooks";
import { searchActions } from "redux/Search/search";
import { useState, useEffect } from "react";

interface InputHeaderControllProps {
  mode: "display" | "edit";

  beforeSubmitEditing?: (finalText?: string) => void;
}

export default function InputHeaderControll({
  mode,
  beforeSubmitEditing,
}: InputHeaderControllProps) {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const { searchedText } = useAppSelector((state) => state.search);
  const InputContainer = mode === "edit" ? View : Pressable;
  const [text, setText] = useState("");

  useEffect(() => {
    setText(searchedText);
  }, []);

  const handleSubmitEditing = () => {
    dispatch(searchActions.setText(text));
    beforeSubmitEditing?.(text);
    navigation.goBack();
  };

  return (
    <View
      style={{
        backgroundColor: Colors.primary_light,
        padding: 5,
        borderRadius: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 15,
        marginTop: 5,
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
          placeholder="Find something for you"
          placeholderTextColor="#ffffff9c"
          autoCorrect
          autoFocus={mode === "edit"}
          onSubmitEditing={handleSubmitEditing}
          onChangeText={setText}
          editable={mode === "edit"}
          value={mode === "display" ? searchedText : text}
          style={{
            color: "#fff",
            fontSize: 18,
            textDecorationLine: "none",
            flex: 1,
          }}
        />
      </InputContainer>

      {mode === "display" ? (
        <IconButton
          onPress={() => {
            dispatch(searchActions.setText(""));
          }}
          icon={<AntDesign name="close" size={24} color="white" />}
        />
      ) : (
        <IconButton
          onPress={handleSubmitEditing}
          icon={<AntDesign name="search1" size={20} color="white" />}
        />
      )}
    </View>
  );
}
