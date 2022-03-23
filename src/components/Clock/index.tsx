import { Colors } from "constants/styles";
import { useState } from "react";
import { StyleProp, Text, TextStyle, View } from "react-native";
import useInterval from "utils/hooks/useInteval";

const block: StyleProp<TextStyle> = {
  fontSize: 20,
  color: "#fff",
  fontWeight: "bold",
  backgroundColor: Colors.primary,
  padding: 5,
  marginLeft: 5,
};

export default function Clock() {
  const [time, setTime] = useState({
    hours: "23",
    minutes: "59",
    seconds: "59",
  });

  useInterval(() => {
    const now = new Date();

    const hours = 23 - now.getHours();
    const minutes = 59 - now.getMinutes();
    const seconds = 59 - now.getSeconds();

    setTime({
      hours: hours < 10 ? "0" + hours : hours.toString(),
      minutes: minutes < 10 ? "0" + minutes : minutes.toString(),
      seconds: seconds < 10 ? "0" + seconds : seconds.toString(),
    });
  }, 1000);

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 5,
        padding: 5,
      }}
    >
      <Text style={[block, { marginLeft: 0 }]}>{time.hours}</Text>
      <Text style={block}>{time.minutes}</Text>
      <Text style={block}>{time.seconds}</Text>
    </View>
  );
}
