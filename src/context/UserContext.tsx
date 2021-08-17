import React, { useContext, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  UserContextProviderType,
  UserContextType,
  UserType,
} from "../@types/types";

export const USER_PREFIX = "react-native-shop-user";

async function SaveUser(props: UserType) {
  try {
    await AsyncStorage.setItem(USER_PREFIX, JSON.stringify(props));
  } catch (error) {
    console.log(error);
  }
}

async function ReadUser() {
  try {
    const value = await AsyncStorage.getItem(USER_PREFIX);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
}

//@ts-ignore
const User = createContext<UserContextType>();

const init: UserType = {
  token: "",
  user_id: -1,
  name: "",
};

export const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [user, setUser] = useState<UserType>(init);

  return (
    <User.Provider value={{ user, setUser, SaveUser, ReadUser }}>
      {children}
    </User.Provider>
  );
};

export const useUser = () => {
  return useContext(User);
};
