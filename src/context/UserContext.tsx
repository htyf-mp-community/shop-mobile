import React, { useContext, createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  UserContextProviderType,
  UserContextType,
  UserType,
} from "../@types/types";

export const USER_PREFIX = "react-native-shop-user";

export const init: UserType = {
  token: "",
  user_id: 0,
  name: "",
  isLoggedIn: false,
};

const User = createContext<UserContextType>({
  user: init,
  ReadUser: () => {},
  RemoveUser: () => {},
  SaveUser: () => {},
  setUser: () => {},
});

export const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [user, setUser] = useState<UserType>(init);

  const setLoggedIn = () => setUser((p) => ({ ...p, isLoggedIn: true }));

  async function SaveUser(props: UserType) {
    try {
      await AsyncStorage.setItem(USER_PREFIX, JSON.stringify(props)).then(
        () => {
          setUser(props);
          setLoggedIn();
        }
      );
    } catch (error) {
      return null;
    }
  }

  async function ReadUser(): Promise<UserType | undefined> {
    try {
      const value = await AsyncStorage.getItem(USER_PREFIX);

      if (value !== null) {
        setUser(JSON.parse(value));
        setLoggedIn();
      }
    } catch (error) {
      return undefined;
    }
  }

  async function RemoveUser() {
    await AsyncStorage.removeItem(USER_PREFIX);
    setUser(init);
  }

  return (
    <User.Provider value={{ user, setUser, SaveUser, ReadUser, RemoveUser }}>
      {children}
    </User.Provider>
  );
};

export const useUser = (): UserContextType => {
  return useContext(User);
};
