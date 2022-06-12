import { AuctionBid } from "/@types/types";
import { useWindowDimensions, View } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import Bid from "./Bid";
import { Padding } from "constants/styles";

interface BidListProps {
  isPresent: boolean;
  bids: AuctionBid[];
}

export default function BidList({ isPresent, bids }: BidListProps) {
  const { width } = useWindowDimensions();

  const CONTAINER_WIDTH = width;
  const INNER_BID_WIDTH = CONTAINER_WIDTH - Padding.medium * 2;

  return isPresent ? (
    <View style={{ width: CONTAINER_WIDTH }}>
      {bids
        .slice(1, bids.length)
        .map(({ amount, bid_id, date_add, user }, index) => (
          <Animated.View key={bid_id} entering={FadeIn.delay(index * 100)}>
            <Bid
              key={bid_id}
              bid={{ amount, bid_id, date_add, user }}
              onOpenModal={() => {}}
              width={INNER_BID_WIDTH}
            />
          </Animated.View>
        ))}
    </View>
  ) : null;
}
