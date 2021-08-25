import Button from "../../components/Button/Button";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_PREFIX, useUser } from "../../context/UserContext";

export default function SignOut() {
  const { setUser } = useUser();

  async function SignOut() {}

  return <Button callback={SignOut} text={"Sign Out"} />;
}
