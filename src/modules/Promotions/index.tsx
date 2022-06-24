import InfiniteScroll from "modules/InfiniteScroll";
import { ImageBackground, useWindowDimensions } from "react-native";

export default function Promotions() {
  const { width } = useWindowDimensions();
  return (
    <InfiniteScroll
      getItem={(item, key) => item[key]}
      getItemCount={(c) => c.length}
      keyExtractor={({ id }: any) => id.toString()}
      orientation={"horizontal"}
      path="/sales"
      showLoadMoreSpinner={false}
      showsHorizontalScrollIndicator={false}
      renderItem={() => (
        <ImageBackground
          style={{
            width: width - 40,
            height: 200,
            marginLeft: 10,
            position: "relative",
            marginTop: 10,
          }}
          source={{
            uri: "https://www.crushpixel.com/big-static18/preview4/super-sale-banner-template-design-2766425.jpg",
          }}
        />
      )}
    />
  );
}
