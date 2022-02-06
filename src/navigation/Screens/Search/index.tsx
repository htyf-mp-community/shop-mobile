import { useNavigation } from "@react-navigation/native";
import {
  Container,
  Suggestion,
  Input,
  Header,
  Button,
} from "@components/index";
import React, { useCallback, useRef } from "react";
import { FlatList, useWindowDimensions, Text } from "react-native";
import { useNavigationProps } from "/@types/types";
import { Colors } from "constants/styles";
import useSearch from "utils/hooks/useSearch";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

export default function SearchScreen() {
  const { width } = useWindowDimensions();
  const sheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation<useNavigationProps>();

  const { query, setQuery, suggestion } = useSearch();

  function onSheetOpen() {
    sheetRef.current?.snapToIndex(0);
  }

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <Container centerVertical>
      <Header
        children={
          <Button
            onPress={onSheetOpen}
            text="Filters"
            style={{ backgroundColor: Colors.primary, padding: 5 }}
            fontStyle={{ color: "#00D85D" }}
          />
        }
      />
      <Input
        value={query}
        setValue={setQuery}
        placeholder="Search..."
        placeholderTextColor={"#fff"}
        style={{
          width: width - 20,
          margin: 0,
        }}
      />

      <FlatList
        data={suggestion}
        keyExtractor={({ prod_id }) => prod_id.toString()}
        renderItem={({ item }) => (
          <Suggestion navigation={navigation} {...item} />
        )}
      />

      <BottomSheet
        ref={sheetRef}
        snapPoints={["60%"]}
        index={-1}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: Colors.primary100,
        }}
        handleIndicatorStyle={{
          backgroundColor: "#00D85D",
        }}
        style={{ padding: 10 }}
      >
        <Text
          style={{ fontSize: 20, fontFamily: "PoppinsBold", color: "#00D85D" }}
        >
          Test
        </Text>
      </BottomSheet>
    </Container>
  );
}
