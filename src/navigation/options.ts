import { Colors } from "../constants/styles";

type route = {
  route: {
    params: any;
  };
};

export const options = ({ route }: route) => ({
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
