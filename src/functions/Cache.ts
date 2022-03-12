import AsyncStorage from "@react-native-async-storage/async-storage";

const Cache = {
  getItem: async <T>(key: string): Promise<T> => {
    const value = await AsyncStorage.getItem(key);

    if (value === null) throw new Error("Cache empty");

    return JSON.parse(value);
  },

  setItem: <T>(key: string, value: T extends {} ? any : any) => {
    AsyncStorage.setItem(key, JSON.stringify(value));
  },

  removeItem: async (key: string) => {
    AsyncStorage.removeItem(key);
  },
};

export default Cache;
