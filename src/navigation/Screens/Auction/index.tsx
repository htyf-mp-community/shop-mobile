import { ScreenNavigationProps } from "/@types/types";
import { Image, ScrollView, useWindowDimensions } from "react-native";
import { Colors } from "constants/styles";
import { image } from "functions/image";
import { useAddBid, useGetAuction } from "./hooks";
import Bid from "./components/Bid";
import BidList from "./components/Bid_list";
import useBoolean from "utils/hooks/useBoolean";
import Addbid from "./components/Add_bid";
import Details from "../ProductDetails/components/Details/Details";
import { API } from "constants/routes";

export default function AuctionScreen({
  route,
}: Required<ScreenNavigationProps<"Auction">>) {
  const { data } = useGetAuction(route.params.auction_id);
  const [addBid, { loading: isBidLoading }] = useAddBid();

  const { width } = useWindowDimensions();
  const { state, toggle } = useBoolean();

  function onBid(amount: number, auction_id: string) {
    return addBid({
      variables: {
        auction_id,
        amount,
      },
    });
  }

  return (
    <ScrollView
      style={{ backgroundColor: Colors.primary, flex: 1, position: "relative" }}
    >
      <Image
        source={image(data?.auction?.product?.img_id)}
        style={{ width: width - 20, height: 250, margin: 10, borderRadius: 5 }}
      />
      {data?.auction?.bids && (
        <>
          <Bid
            bid={data?.auction?.bids[0] ?? { amount: 0 }}
            onOpenModal={toggle}
          />
          <BidList bids={data?.auction.bids} isPresent={state} />
          <Addbid
            isLoading={isBidLoading}
            highest={data?.auction.bids?.[0]?.amount || 0}
            auction_id={route.params.auction_id}
            onBid={onBid}
          />
        </>
      )}

      <Details
        showPrice={false}
        image={`${API}/upload/image=${data?.auction?.product?.img_id[0]?.name}`}
        {...(data?.auction?.product as any)}
      />
    </ScrollView>
  );
}
