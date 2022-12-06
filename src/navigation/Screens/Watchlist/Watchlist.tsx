import { Text, View } from "react-native";
import useColorTheme from "utils/context/ThemeContext";
import { useEffect, useMemo, useState } from "react";
import ProductsList from "./components/ProductsList";
import { transformInto2DimsArray } from "./transform2Dims";
import useWatchlist from "./useWatchlist";
import { ScreenNavigationProps } from "/@types/types";
import { IconButton } from "components";

import { Entypo } from "@expo/vector-icons";
import Ripple from "react-native-material-ripple";
import { Colors } from "constants/styles";
import Menu from "components/Menu";

export default function Watchlist({
  navigation,
}: ScreenNavigationProps<"Watchlist">) {
  const { theme } = useColorTheme();
  const { data, onEndReached } = useWatchlist();

  const watchlist = useMemo(() => transformInto2DimsArray(data), [data]);

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: ({}) => (
        <Ripple
          rippleCentered
          rippleColor="#fff"
          style={{ margin: 10 }}
          onPress={() => setShowMenu((prev) => !prev)}
        >
          <Entypo name="dots-three-vertical" size={20} color="white" />
        </Ripple>
      ),
    });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      <ProductsList onEndReached={onEndReached} data={watchlist} />

      {/* <Menu placement="right" isOpen={showMenu} />
       */}
    </View>
  );
}
