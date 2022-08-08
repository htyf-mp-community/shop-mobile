import React, { useCallback, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Container, Suggestion, Input } from "@components/index";
import { VirtualizedList, useWindowDimensions } from "react-native";
import { useNavigationProps } from "/@types/types";
import { Colors } from "constants/styles";
import useSearch from "./hooks/useSearch";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import Filters from "./components/Filters";
import type { SuggestionType } from "/@types/types";
import HeaderActions from "./components/HeaderActions";
import RecentSearches from "./components/RecentSearches";
import RecentGrid from "./components/RecentGrid";

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

  const {
    query,
    setQuery,
    suggestion,
    onEndReached,
    params,
    onClearParams,
    onSetParams,
  } = useSearch();

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
      <HeaderActions onSheetOpen={onSheetOpen} />
      <Input
        value={query}
        setValue={setQuery}
        placeholder="Search..."
        placeholderTextColor={"#fff"}
        autoFocus
        style={{
          width: width - 20,
        }}
      />

      <RecentSearches query={query} data={suggestion.results} />

      {suggestion.results.length > 0 && (
        <VirtualizedList
          data={suggestion.results}
          onEndReached={onEndReached}
          keyExtractor={({ prod_id }) => prod_id.toString()}
          getItemCount={(data) => data.length}
          getItem={getItem}
          initialNumToRender={2}
          renderItem={({ item, index }) => (
            <Suggestion index={index} navigation={navigation} {...item} />
          )}
        />
      )}

      {/*    <RecentGrid /> */}

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
        <Filters
          onClearParams={onClearParams}
          onSetParams={onSetParams}
          params={params}
        />
      </BottomSheet>
    </Container>
  );
}
