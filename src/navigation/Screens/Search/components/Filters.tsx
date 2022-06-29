import { View, Text, StyleProp, TextStyle } from "react-native";
import useFetch from "@utils/hooks/useFetch";
import { Colors, Padding } from "constants/styles";
import { memo } from "react";
import { Button } from "components";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import Ripple from "react-native-material-ripple";
import type { Params } from "../index";

const text: StyleProp<TextStyle> = {
  color: "#00D85D",
  fontFamily: "PoppinsMedium",
  fontSize: 30,
  marginLeft: 10,
};

interface FiltersProps {
  onClearParams: () => void;
  onSetParams: <T extends keyof Params>(key: T, value: Params[T]) => void;
  params: Params;
}

const Filters = ({ onSetParams, params, onClearParams }: FiltersProps) => {
  const { data = [] } = useFetch<readonly string[]>("/products/categories");

  return (
    <>
      <Text style={text}>Category</Text>
      <View style={{ width: "100%", height: 80 }}>
        <BottomSheetFlatList
          data={data}
          keyExtractor={(key) => key}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            padding: Padding.medium,
            height: 60 + Padding.medium,
          }}
          renderItem={({ item }) => (
            <Ripple
              rippleCentered
              onPress={() => onSetParams("category", item)}
              style={{
                marginRight: 10,
                borderRadius: 5,
                padding: Padding.medium,
                backgroundColor:
                  params.category === item ? "#00D85D" : Colors.primary,
              }}
            >
              <Text style={{ fontSize: 20, color: "white" }}>{item}</Text>
            </Ripple>
          )}
        />
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text style={text}>Name A-Z</Text>
        <View style={{ flexDirection: "row" }}>
          <Button
            onPress={() => onSetParams("title", "ASC")}
            text="Sort A-Z"
            style={{
              marginLeft: 10,
              backgroundColor:
                params.title === "ASC" ? "#00D85D" : Colors.primary,
            }}
          />
          <Button
            onPress={() => onSetParams("title", "DESC")}
            text="Sort Z-A"
            style={{
              marginLeft: 10,
              backgroundColor:
                params.title === "DESC" ? "#00D85D" : Colors.primary,
            }}
          />
        </View>
      </View>
      <View style={{ marginBottom: 10 }}>
        <Text style={text}>Price</Text>
        <View style={{ flexDirection: "row" }}>
          <Button
            onPress={() => onSetParams("price", "DESC")}
            text="High-Low"
            style={{
              marginLeft: 10,
              backgroundColor:
                params.price === "DESC" ? "#00D85D" : Colors.primary,
            }}
          />
          <Button
            onPress={() => onSetParams("price", "ASC")}
            text="Low-High"
            style={{
              marginLeft: 10,
              backgroundColor:
                params.price === "ASC" ? "#00D85D" : Colors.primary,
            }}
          />
        </View>
      </View>
      <Button
        onPress={() => onClearParams()}
        text="Clear All"
        color="ternary"
        type="contained"
        size="xl"
        borderRadius="full"
        style={{ justifyContent: "center", margin: 10 }}
      />
    </>
  );
};

export default memo(Filters);
