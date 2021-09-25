import React, { useContext, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  UserContextProviderType,
  UserContextType,
  UserType,
} from "../@types/types";

export const USER_PREFIX = "react-native-shop-user";

async function ReadUser(): Promise<UserType | undefined> {
  try {
    const value = await AsyncStorage.getItem(USER_PREFIX);
    return value !== null ? JSON.parse(value) : undefined;
  } catch (error) {
    return undefined;
  }
}

export const init: UserType = {
  token: "",
  user_id: -1,
  name: "",
};

//@ts-ignore
const User = createContext<UserContextType>();

export const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [user, setUser] = useState<UserType>(init);

  async function SaveUser(props: UserType) {
    try {
      await AsyncStorage.setItem(USER_PREFIX, JSON.stringify(props)).then(() =>
        setUser(props)
      );
    } catch (error) {
      return null;
    }
  }

  return (
    <User.Provider value={{ user, setUser, SaveUser, ReadUser }}>
      {children}
    </User.Provider>
  );
};

export const useUser = () => {
  return useContext(User);
};
