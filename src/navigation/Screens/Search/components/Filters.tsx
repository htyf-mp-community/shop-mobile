import {
  View,
  Text,
  StyleProp,
  TextStyle,
  Pressable,
  ViewStyle,
} from "react-native";
import useFetch from "@utils/hooks/useFetch";
import { Colors } from "constants/styles";
import { memo } from "react";
import { Button } from "components";

const text: StyleProp<TextStyle> = {
  color: "#00D85D",
  fontFamily: "PoppinsMedium",
  fontSize: 30,
};

const pressable: StyleProp<ViewStyle> = {
  marginRight: 10,
  marginTop: 10,
  backgroundColor: Colors.primary,
  padding: 10,
  borderRadius: 10,
};

interface FiltersProps {
  onSetParams: (key: string, value: string) => void;
  params: {
    title?: string;
    price?: string;
    category?: string;
  };
}

const Filters = ({ onSetParams, params }: FiltersProps) => {
  const { data } = useFetch<readonly string[]>("/products/categories", [], []);

  return (
    <View style={{ padding: 15 }}>
      <View style={{ marginBottom: 15 }}>
        <Text style={text}>Category</Text>
        <View style={{ flexWrap: "wrap", flexDirection: "row" }}>
          {data.map((text) => (
            <Pressable
              key={text}
              onPress={() => onSetParams("category", text)}
              style={[
                pressable,
                {
                  backgroundColor:
                    params.category === text ? "#00D85D" : Colors.primary,
                },
              ]}
            >
              <Text style={{ fontSize: 20, color: "white" }}>{text}</Text>
            </Pressable>
          ))}
        </View>
      </View>
      <View style={{ marginBottom: 15 }}>
        <Text style={text}>Name A-Z</Text>
        <View style={{ flexDirection: "row" }}>
          <Button
            onPress={() => onSetParams("title", "ASC")}
            text="Sort A-Z"
            style={{
              marginRight: 10,
              backgroundColor:
                params.title === "ASC" ? "#00D85D" : Colors.primary,
            }}
          />
          <Button
            onPress={() => onSetParams("title", "DESC")}
            text="Sort Z-A"
            style={{
              marginRight: 10,
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
              marginRight: 10,
              backgroundColor:
                params.price === "DESC" ? "#00D85D" : Colors.primary,
            }}
          />
          <Button
            onPress={() => onSetParams("price", "ASC")}
            text="Low-High"
            style={{
              marginRight: 10,
              backgroundColor:
                params.price === "ASC" ? "#00D85D" : Colors.primary,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default memo(Filters);
