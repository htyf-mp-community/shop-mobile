import { AntDesign } from "@expo/vector-icons";
import layout from "constants/layout";
import Ripple from "react-native-material-ripple";
import { View } from "react-native";
import { Button } from "components";

const padding = 10;

const Controls = (props: {
  onPress: Function;
  hasNext: boolean;
  canGoBack: boolean;
  text: string;
  goBack: Function;
}) => (
  <View
    style={{
      flexDirection: "row",
      width: layout.screen.width,
      padding: 15,
    }}
  >
    <Ripple
      onPress={() => props.goBack()}
      disabled={!props.canGoBack}
      style={{
        justifyContent: "center",
        backgroundColor: "#8408D4",
        alignItems: "center",
        padding: padding * 1.5,
        borderRadius: 100,
        marginRight: 15,
        opacity: !props.canGoBack ? 0.5 : 1,
      }}
    >
      <AntDesign name="arrowleft" color={"#fff"} size={25} />
    </Ripple>
    <Button
      disabled={!props.hasNext}
      callback={() => props.onPress()}
      size="xl"
      text={props.text || "Next Step"}
      variant="primary"
      type="contained"
      style={{ flex: 1, borderRadius: 40 }}
    ></Button>
  </View>
);

export default Controls;
