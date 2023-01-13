import { image } from "functions/image";
import { Image, Text, View } from "react-native";

export default function SellerTile() {
  console.log("helo?");
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        marginBottom: 10,
      }}
    >
      <Image
        source={image(undefined)}
        style={{ width: 35, height: 35, borderRadius: 100 }}
      />
      <Text style={{ color: "#fff" }}>Sells NIKE</Text>
    </View>
  );
}
