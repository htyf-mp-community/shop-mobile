import { SkeletonPlaceholder } from "components";
import {
  VirtualizedList,
  ListRenderItem,
  View,
  Text,
  useWindowDimensions,
  VirtualizedListProps,
} from "react-native";
import useInfiniteScrolling from "./useInfiniteScrolling";

interface InfiniteScrollProps<T> extends VirtualizedListProps<T> {
  orientation: "vertical" | "horizontal";
  path: `/${string}`;
  heading?: string;
}

export default function InfiniteScroll({
  orientation,
  renderItem,
  keyExtractor,
  getItem,
  getItemCount,
  path,
  heading,
  ...rest
}: InfiniteScrollProps<any>) {
  const { data, onSkip, loading } = useInfiniteScrolling(path);
  const { width } = useWindowDimensions();

  return (
    <View>
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
    </View>
  );
}
