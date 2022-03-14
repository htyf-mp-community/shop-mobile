import { VirtualizedList, ListRenderItem } from "react-native";
import useInfiniteScrolling from "./useInfiniteScrolling";

interface InfiniteScrollProps {
  orientation: "vertical" | "horizontal";
  renderItem: ListRenderItem<unknown> | null | undefined;
  getItemCount: ((data: any) => number) | undefined;
  getItem: ((data: any, index: number) => unknown) | undefined;
  path: `/${string}`;
  keyExtractor: ((item: unknown, index: number) => string) | undefined;
}

export default function InfiniteScroll({
  orientation,
  renderItem,
  keyExtractor,
  getItem,
  getItemCount,
  path,
}: InfiniteScrollProps) {
  const { data, onSkip } = useInfiniteScrolling(path);
  return (
    <VirtualizedList
      onEndReachedThreshold={0.5}
      onEndReached={onSkip}
      horizontal={orientation === "horizontal"}
      getItem={getItem}
      getItemCount={getItemCount}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
}
