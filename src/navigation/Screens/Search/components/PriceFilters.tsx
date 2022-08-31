import { Input } from "components";
import layout from "constants/layout";
import FilterOptionContainer from "./FilterOptionContainer";
import { useState } from "react";
import { View } from "react-native";
import useDelay from "utils/hooks/useDelay";
import { useAppDispatch } from "utils/hooks/hooks";
import { searchActions } from "redux/Search/search";

export default function PriceFilters() {
  const [min, setMin] = useState("0");
  const [max, setMax] = useState("");

  const dispatch = useAppDispatch();

  const labelStyle = {
    color: "#ffffff62",
    fontSize: 14,
  };

  useDelay(
    () => {
      dispatch(
        searchActions.setFilter({
          key: "price",
          value: {
            max: Number(max),
            min: Number(min),
          },
        })
      );
    },
    500,
    [min, max]
  );

  return (
    <FilterOptionContainer title="Set price range">
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Input
          keyboardType="numeric"
          name="Min"
          labelStyle={labelStyle}
          value={min}
          setValue={setMin}
          style={{
            width: (layout.screen.width - 20) / 2 - 5,
          }}
        />
        <Input
          keyboardType="numeric"
          name="Max"
          value={max}
          labelStyle={labelStyle}
          setValue={setMax}
          style={{
            width: (layout.screen.width - 20) / 2 - 5,
          }}
        />
      </View>
    </FilterOptionContainer>
  );
}
