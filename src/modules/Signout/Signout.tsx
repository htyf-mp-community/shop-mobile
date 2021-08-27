import Button from "../../components/Button/Button";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_PREFIX, useUser, init } from "../../context/UserContext";

export default function SignOut() {
  const { setUser } = useUser();

  async function SignOut() {
    try {
      await AsyncStorage.removeItem(USER_PREFIX);
      setUser(init);
    } catch (error) {
      console.log(error);
    }
  }

  return <Button callback={SignOut} text={"Sign Out"} />;
}
