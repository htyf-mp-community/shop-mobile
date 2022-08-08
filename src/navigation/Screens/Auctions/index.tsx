import { Auction, ScreenNavigationProps } from "/@types/types";
import { Container } from "components";
import Header from "./Header";
import useGetPendingAuctions from "./useGetAuctions";
import { VirtualizedList, LogBox } from "react-native";
import Card from "./Card";
import { useCallback, useState } from "react";
import RemoveProductsRepetition from "functions/RemoveRepetition";

LogBox.ignoreAllLogs(true);

export default function Auctions({
  navigation,
}: Required<ScreenNavigationProps<"Auctions">>) {
  const [skip, setSkip] = useState(5);
  const { data, fetchMore, loading } = useGetPendingAuctions();

  const onEndReached = useCallback(async () => {
    fetchMore({
      variables: { skip },

      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          auctions: RemoveProductsRepetition(
            [...prev.auctions, ...fetchMoreResult.auctions],
            "auction_id"
          ),
        };
      },
    });

    setSkip((prev) => prev + 5);
  }, [skip]);

  return (
    <Container>
      {/* <Header /> */}

      <VirtualizedList
        onEndReachedThreshold={0.5}
        onEndReached={onEndReached}
        data={(data?.auctions as Auction[]) || []}
        initialNumToRender={5}
        getItem={(data, index) => data[index] as Required<Auction>}
        getItemCount={(d) => d.length}
        keyExtractor={({ auction_id }) => auction_id}
        renderItem={({ item }: { item: Required<Auction> }) => (
          <Card
            {...item}
            navigation={navigation}
            product={{
              ...item.product,
              category: item.product.category as string,
            }}
          />
        )}
      />
      {/*  {loading && !data?.auctions && (
        <View style={{ position: "absolute", top: 100 }}>
          {new Array(5).fill({}).map((_, index) => (
            <Placeholder key={index} />
          ))}
        </View>
      )} */}
    </Container>
  );
}
