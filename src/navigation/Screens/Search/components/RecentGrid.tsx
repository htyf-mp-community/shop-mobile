import { image } from "functions/image";
import { FlatList, Image, useWindowDimensions, View } from "react-native";

const testing_data = new Array(10).fill({}).map((_, index) => ({
  index,
  image: image(undefined),
}));

function createGrid(input: typeof testing_data): typeof testing_data[] {
  const result = [];
  for (let i = 0; i < input.length; i += 2) {
    result.push([input[i], input[i + 1]]);
  }
  return result;
}

export default function RecentGrid() {
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 10,
      }}
    >
      <FlatList
        data={createGrid(testing_data)}
        keyExtractor={(_, key) => key.toString()}
        renderItem={({ item: [one, two] }) => (
          <View
            style={{
              flexDirection: "row",
              width,
              justifyContent: "center",
            }}
          >
            <Image
              style={{
                width: width / 2 - 20,
                height: 100,
                margin: 5,
              }}
              source={one.image}
            />
            <Image
              style={{
                width: width / 2 - 20,
                height: 100,
                margin: 5,
              }}
              source={two.image}
            />
          </View>
        )}
      />
    </View>
  );
}
