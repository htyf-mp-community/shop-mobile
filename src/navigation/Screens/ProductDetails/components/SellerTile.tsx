import { Colors } from "constants/styles";
import { image } from "functions/image";
import { Image, Text, View } from "react-native";

export default function SellerTile(props: {
  seller?: {
    name: string;
    image: string;
  };
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        marginBottom: 10,
        height: 40,
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          source={image(undefined)}
          style={{ width: 35, height: 35, borderRadius: 100 }}
        />

        <Text style={{ color: "#fff", fontSize: 20, marginLeft: 10 }}>
          {props?.seller?.name}
        </Text>
      </View>

      <Text style={{ color: "rgba(255,255,255,0.8)", marginRight: 5 }}>
        See more
      </Text>
    </View>
  );
}
