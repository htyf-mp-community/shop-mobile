import AsyncStorage from "@react-native-async-storage/async-storage";

const TTL = 10; // 10 seconds

function checkTime(time: number) {
  return (Date.now() - time) / 1000 > TTL;
}

const Cache = {
  read: async (key: string) => {
    const data = await AsyncStorage.getItem(key);

    if (data === null) return null;

    const parsed = JSON.parse(data);

    const hasPassed = checkTime(parsed.time as number);

    if (hasPassed) return null;

    return parsed.data;
  },
  set: (key: string, value: any) => {
    return AsyncStorage.setItem(
      key,
      JSON.stringify({
        time: Date.now(),
        data: value,
      })
    );
  },
};

export default Cache;
