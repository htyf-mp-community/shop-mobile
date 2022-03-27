import AsyncStorage from "@react-native-async-storage/async-storage";

export interface RecentProps {
  text: string;
  date: Date;
  id: number;
}

const KEY = "GET_SEARCHED";

export default function useRecent() {
  async function getSearched(): Promise<RecentProps[]> {
    const recent = await AsyncStorage.getItem(KEY);

    return recent ? JSON.parse(recent) : [];
  }

  async function setSearched(text: string) {
    const prev = await getSearched();
    await AsyncStorage.setItem(
      KEY,
      JSON.stringify([
        ...prev,
        {
          date: new Date(),
          id: Date.now(),
          text,
        },
      ])
    );
  }

  return {
    get: getSearched,
    save: setSearched,
  };
}
