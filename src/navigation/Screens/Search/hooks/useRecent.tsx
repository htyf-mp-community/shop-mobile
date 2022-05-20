import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export interface Recent {
  text: string;
  date: Date;
  id: number;
}

const KEY = "GET_SEARCHED";

export default function useRecent() {
  const [recent, setRecent] = useState<Recent[]>([]);

  async function loadRecentAsync() {
    const json = (await AsyncStorage.getItem(KEY)!) as string;

    return JSON.parse(json);
  }

  async function saveRecentAsync() {
    await AsyncStorage.setItem(KEY, JSON.stringify(recent));
  }

  function removeRecent(id: number) {
    setRecent((recent) => recent.filter((r) => r.id !== id));
  }

  function appendRecent(text: string) {
    if (text !== "")
      setRecent((recent) => [
        ...recent,
        {
          text,
          date: new Date(),
          id: Date.now(),
        },
      ]);
  }

  useEffect(() => {
    loadRecentAsync();
  }, []);

  useEffect(() => {
    if (!!recent.length) saveRecentAsync();
  }, [recent]);

  return { recent, removeRecent, appendRecent };
}
