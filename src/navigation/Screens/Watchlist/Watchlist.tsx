import { ProductMinified } from "/@types/types";
import { Image, Text, View, VirtualizedList } from "react-native";
import useColorTheme from "utils/context/ThemeContext";
import useFetch from "utils/hooks/useFetch";
import Product from "modules/Product";
import { Button, Modal } from "components";
import { FontAwesome5 } from "@expo/vector-icons";
import useWatchlist from "modules/AddWatchlist/useWatchlist";
import { useDispatch } from "react-redux";
import { useAppSelector } from "utils/hooks/hooks";
import { watchlistActions } from "redux/Watchlist/Watchlist";
import Animated, { FadeInDown } from "react-native-reanimated";
import Tile from "./components/Tile";
import { image } from "functions/image";

import { useState } from "react";
import layout from "constants/layout";
import { BlurView } from "expo-blur";

const init = {
  hasMore: false,
  results: [],
};

interface FetchProps {
  hasMore: boolean;
  results: ProductMinified[];
}

export default function Watchlist() {
  const { theme } = useColorTheme();
  const dispatch = useDispatch();
  const { data, isSynced } = useAppSelector((state) => state.watchlist);

  useFetch<FetchProps>("/watchlist", {
    invalidate: [],
    fetchOnMount: !isSynced,
    onSuccess: (data = init) => {
      dispatch(watchlistActions.setWatchlist(data));
    },
  });

  const { remove } = useWatchlist(-1, { withCheck: false });

  const [selectedTile, setSelectedTile] = useState<ProductMinified | null>(
    null
  );

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      <VirtualizedList
        data={data}
        initialNumToRender={4}
        keyExtractor={({ prod_id }: ProductMinified) => prod_id.toString()}
        getItem={(data, key) => data[key] as ProductMinified}
        getItemCount={(d) => d.length}
        renderItem={({ item, index }) => {
          return (
            <Animated.View
              entering={FadeInDown.delay(index * 100)}
              style={{ marginBottom: 10, position: "relative" }}
            >
              <Product
                {...item}
                sharedID="Favs"
                fullSize
                hide
                price={+item.price}
              />
              <Button
                type="contained"
                rippleColor="white"
                icon={
                  <FontAwesome5 name="heart-broken" size={24} color="white" />
                }
                onPress={() => remove(item.prod_id)}
                variant="primary"
                style={{
                  justifyContent: "center",
                  position: "absolute",
                  right: 15,
                  bottom: 15,
                  borderRadius: 100,
                }}
              />
            </Animated.View>
          );
        }}
      />

      {/*   <View
        style={{
          padding: 5,
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {data.map((prod, i) => (
          <Tile
            key={prod.prod_id}
            setSelectedTile={(tile) => setSelectedTile(tile)}
            product={prod}
          />
        ))}

        <Modal
          animationIn="zoomIn"
          animationOut="zoomOut"
          focusable
          isVisible={selectedTile !== null}
          onBackdropPress={() => setSelectedTile(null)}
          onBackButtonPress={() => setSelectedTile(null)}
        >
          <Image
            style={{ width: layout.window.width * 0.85, height: 300 }}
            source={image(selectedTile?.img_id)}
          />
          <Text
            style={{
              color: "#fff",
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            {selectedTile?.title}
          </Text>
          <Text style={{ color: "#fff" }}>${selectedTile?.price}</Text>
          <Button text="See more" color="primary" />
        </Modal>
      </View> */}
    </View>
  );
}
