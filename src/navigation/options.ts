import { Colors } from "../constants/styles";
export const options = ({ route }: { route: Object }) => ({
  //@ts-ignore
  title: route.params.title,
  headerTitleAlign: "center",
  gestureEnabled: true,
  gestureDirection: "vertical",
  gestureResponseDistance: 100,
  presentation: "modal",
  headerShown: true,
  headerStyle: { backgroundColor: Colors.primary },
  headerTintColor: "white",
});
