import { useEffect, useState } from "react";
import { FlatList, useWindowDimensions, View, Text } from "react-native";
import useRecent, { RecentProps } from "../hooks/useRecent";

interface RecentSearchesProps {
  query: string;
  data: any[];
}

export default function RecentSearches({ query, data }: RecentSearchesProps) {
  const [recent, setRecent] = useState<RecentProps[]>([]);
  // const { get } = useRecent();

  /*  useEffect(() => {
    (async () => {
      const searched = await get();

      setRecent(searched);
    })();
  }, []); */

  const { width } = useWindowDimensions();

  return (
    <View style={{ width, padding: 10 }}>
      <FlatList
        data={recent}
        keyExtractor={({ id }) => id.toString()}
        renderItem={({ item }) => (
          <View style={{ width: width - 20, padding: 5 }}>
            <Text style={{ color: "#fff" }}>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
}
