import React, { useCallback, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Container,
  Suggestion,
  Input,
  Header,
  Button,
} from "@components/index";
import { VirtualizedList, useWindowDimensions } from "react-native";
import { useNavigationProps } from "/@types/types";
import { Colors } from "constants/styles";
import useSearch from "@utils/hooks/useSearch";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import Filters from "./components/Filters";
import type { SuggestionType } from "/@types/types";

export interface Params {
  category?: string;
  price?: "ASC" | "DESC";
  title?: "ASC" | "DESC";
}

const getItem = (data: SuggestionType[], index: number) => {
  return data[index];
};

export default function SearchScreen() {
  const { width } = useWindowDimensions();
  const sheetRef = useRef<BottomSheet>(null);
  const navigation = useNavigation<useNavigationProps>();

  const [params, setParams] = useState<{
    [key in keyof Params]: Params[key];
  }>({});

  function onSetParams<T extends keyof Params>(key: T, value: Params[T]) {
    setParams((p) => ({
      ...p,
      [key]: value,
    }));
  }
  const { query, setQuery, suggestion } = useSearch(params);

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
      <Header>
        <Button
          onPress={onSheetOpen}
          text="Filters"
          style={{ backgroundColor: Colors.primary, padding: 5 }}
          fontStyle={{ color: "#00D85D" }}
        />
      </Header>

      <Input
        value={query}
        setValue={setQuery}
        placeholder="Search..."
        placeholderTextColor={"#fff"}
        style={{
          width,
          margin: 0,
        }}
      />

      <VirtualizedList
        data={suggestion}
        keyExtractor={({ prod_id }) => prod_id.toString()}
        getItemCount={(data) => data.length}
        getItem={getItem}
        initialNumToRender={2}
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
      >
        <Filters onSetParams={onSetParams} params={params} />
      </BottomSheet>
    </Container>
  );
}
