import InfiniteScroll from "modules/InfiniteScroll";
import {
  ImageBackground,
  useWindowDimensions,
  View,
  StyleSheet,
  Text,
} from "react-native";

export default function Promotions() {
  const { width } = useWindowDimensions();
  return (
    <InfiniteScroll
      getItem={(item, key) => item[key]}
      getItemCount={(c) => c.length}
      keyExtractor={({ id }: any) => id.toString()}
      orientation={"horizontal"}
      path="/sales"
      showsHorizontalScrollIndicator={false}
      renderItem={({ item, index }) => (
        <View
          style={{
            width: width - 40,
            height: 200,
            marginLeft: 10,
            position: "relative",
            marginTop: 10,
          }}
        >
          <ImageBackground
            style={StyleSheet.absoluteFillObject}
            source={{
              uri: "https://www.crushpixel.com/big-static18/preview4/super-sale-banner-template-design-2766425.jpg",
            }}
          />
          {/*  <View
            style={{
              position: "absolute",
              padding: 5,
              bottom: 5,
              left: 5,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontFamily: "PoppinsBold",
                lineHeight: 25,
              }}
            >
              Super sale
            </Text>
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                fontFamily: "PoppinsBold",
                lineHeight: 25,
              }}
            >
              Check it out before end
            </Text>
          </View> */}
        </View>
      )}
    />
  );
}
