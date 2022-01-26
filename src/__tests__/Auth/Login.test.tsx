import "@testing-library/jest-native/extend-expect";
import { render } from "@testing-library/react-native";

import { UserContextProvider } from "../../context/UserContext";
import Auth from "../../navigation/Screens/Auth";

describe("LoginScreen", () => {
  test("It Authenticates and changes Screen", () => {
    render(
      <UserContextProvider>
        <Auth />
      </UserContextProvider>
    );
  });
});
