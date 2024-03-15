import { useState } from "react";
import { Text, View } from "react-native";
import useInterval from "utils/hooks/useInteval";

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
        borderRadius: 5,
        padding: 5,
      }}
    >
      <Text style={{ color: "#fff", fontSize: 15 }}>
        Ends in {`${time.hours}h ${time.minutes}min`}
      </Text>
    </View>
  );
}
