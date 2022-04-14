import { SkeletonPlaceholder } from "components";
import { Padding } from "constants/styles";
import { useState } from "react";
import {
  VirtualizedList,
  View,
  Text,
  useWindowDimensions,
  VirtualizedListProps,
  ActivityIndicator,
} from "react-native";
import useColorTheme from "utils/context/ThemeContext";
import useInfiniteScrolling from "./useInfiniteScrolling";

interface InfiniteScrollProps<T> extends Omit<VirtualizedListProps<T>, "data"> {
  orientation: "vertical" | "horizontal";
  path: `/${string}`;
  heading?: string;
  showLoadMoreSpinner?: boolean;
}

export default function InfiniteScroll<T>({
  orientation,
  renderItem,
  keyExtractor,
  getItem,
  getItemCount,
  path,
  heading,
  showLoadMoreSpinner = true,
  ...rest
}: InfiniteScrollProps<T>) {
  const [options, setOptions] = useState({});

  const { data, onSkip, loading } = useInfiniteScrolling<T, typeof options>(
    path,
    options
  );
  const { width } = useWindowDimensions();

  const { theme } = useColorTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      {!!heading && (
        <Text style={{ fontSize: 25, color: "white" }}>{heading}</Text>
      )}

      {loading && data.length === 0 && (
        <SkeletonPlaceholder
          backgroundColor={"#1f2b3d"}
          highlightColor={"#2a3a52"}
          size={{ width, height: 250 }}
        >
          <View style={{ width, height: 250, alignItems: "center" }}>
            <SkeletonPlaceholder.Item height={250} width={width - 20} />
          </View>
        </SkeletonPlaceholder>
      )}

      <VirtualizedList
        onEndReachedThreshold={0.5}
        onEndReached={onSkip}
        horizontal={orientation === "horizontal"}
        getItem={getItem}
        getItemCount={getItemCount}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        {...rest}
      />
      {showLoadMoreSpinner && loading && (
        <View
          style={{ width, padding: Padding.medium, justifyContent: "center" }}
        >
          <ActivityIndicator size={"large"} color="#fff" />
        </View>
      )}
    </View>
  );
}
