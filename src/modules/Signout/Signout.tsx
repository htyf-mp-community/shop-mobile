import Button from "../../components/Button/Button";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_PREFIX, useUser, init } from "../../context/UserContext";

export default function SignOut() {
  const { setUser } = useUser();

  const [tapped, setTapped] = useState(0);

  async function SignOut() {
    setTapped(tapped + 1);
    if (tapped > 1) {
      try {
        await AsyncStorage.removeItem(USER_PREFIX);
        setUser(init);
      } catch (error) {
        console.log(error);
      }
    }
  }

  return <Button callback={SignOut} text={"Sign Out"} />;
}
