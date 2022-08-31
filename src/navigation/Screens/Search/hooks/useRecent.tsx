import AsyncStorage from "@react-native-async-storage/async-storage";
import RemoveProductsRepetition from "functions/RemoveRepetition";
import { useEffect, useState } from "react";
import { searchActions } from "redux/Search/search";
import { useAppDispatch, useAppSelector } from "utils/hooks/hooks";

const KEY = "GET_SEARCHED";

export default function useRecent() {
  const { searchHistory } = useAppSelector((st) => st.search);
  const dispatch = useAppDispatch();

  async function loadRecentAsync() {
    const recent = await AsyncStorage.getItem(KEY);
    if (recent) {
      dispatch(searchActions.setSearchHistory(JSON.parse(recent)));
    }
  }

  async function saveSearchHistory() {
    await AsyncStorage.setItem(
      KEY,
      JSON.stringify(RemoveProductsRepetition(searchHistory, "text"))
    );
  }

  async function appendRecent(text: string) {
    dispatch(
      searchActions.addSearchHistory({
        id: Date.now(),
        text,
      })
    );
  }

  async function removeRecent(id: number) {
    dispatch(searchActions.removeSearchHistory(id));
  }

  useEffect(() => {
    loadRecentAsync();
  }, []);

  useEffect(() => {
    if (searchHistory.length > 0) saveSearchHistory();
  }, [searchHistory]);

  return {
    recent: searchHistory,
    loadRecentAsync,
    appendRecent,
    removeRecent,
  };
}
