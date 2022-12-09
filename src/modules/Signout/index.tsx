import Button from "../../components/Button/Button";
import React from "react";
import { useUser } from "@utils/context/UserContext";
import { Modal } from "components";
import { Dimensions, Text, View } from "react-native";
import useBoolean from "utils/hooks/useBoolean";
import styles from "./styles";
import useColorTheme from "utils/context/ThemeContext";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { cacheAction } from "redux/Cache/Cache";
import { cartActions } from "redux/Cart";
import { watchlistActions } from "redux/Watchlist/Watchlist";
import { checkoutActions } from "redux/Checkout";
import { userActions } from "redux/User";
import { useApolloClient } from "@apollo/client";
import Color from "color";

const { height } = Dimensions.get("screen");

export default function SignOut() {
  const { RemoveUser } = useUser();

  const { state: isVisible, positive, negative } = useBoolean();

  const { theme } = useColorTheme();

  const color = { color: theme.text };

  const dispatch = useDispatch();

  const apolloClient = useApolloClient();

  async function handleSignOut() {
    // hide modal
    negative();

    // clear graphql cache
    await apolloClient.clearStore();
    // clear cache
    dispatch(cacheAction.clearCache());
    // clear cart
    dispatch(cartActions.clearCart());
    // clear watchlist
    dispatch(watchlistActions.clearWatchlist());
    // clear checkout
    dispatch(checkoutActions.destroySession());

    // clear user store
    dispatch(userActions.removeUser());
    // remove user from storage
    RemoveUser();
  }

  return (
    <>
      <Modal
        onBackdropPress={negative}
        isVisible={isVisible}
        animationIn="zoomIn"
        animationOut="zoomOutUp"
        useNativeDriverForBackdrop
        style={styles.modal}
        deviceHeight={height}
        statusBarTranslucent
        hideModalContentWhileAnimating
      >
        <AntDesign
          name="warning"
          size={30}
          color="orange"
          style={styles.icon}
        />
        <Text style={[styles.heading, color]}>Sign out from store</Text>
        <Text style={[styles.subText, { color: theme.textFaded }]}>
          Are you sure you would like to sign out of your Shop account?
        </Text>

        <View style={[styles.row, { marginTop: 50 }]}>
          <Button
            color="primary"
            type="contained"
            size="xl"
            borderRadius="lg"
            text="Cancel"
            style={{ width: "45%" }}
            callback={negative}
          />
          <Button
            borderRadius="lg"
            variant="disabled"
            size="xl"
            text="Sign out"
            style={{ width: "45%" }}
            callback={handleSignOut}
          />
        </View>
      </Modal>

      <Button
        onPress={positive}
        color="primary"
        size="md"
        type="contained"
        text={"SIGN OUT"}
        rippleColor="red"
        fontStyle={{
          fontSize: 17,
          color: theme.error,
        }}
        style={{
          marginTop: 50,
          marginBottom: 20,
          justifyContent: "center",
          backgroundColor: Color(theme.error).alpha(0.125).string(),
          borderWidth: 1,
          borderColor: Color(theme.error).alpha(0.2).string(),
        }}
      />
    </>
  );
}
