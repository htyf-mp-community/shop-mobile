import React, { useContext, createContext, useState } from "react";

type UserContextProviderType = {
  children: React.ReactNode;
};

type UserType = {
  token: string;
  name: string;
  user_id: number;
};

type UserContextType = {
  user: UserType;
  setUser: (prop: any) => void;
};

const User = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: UserContextProviderType) => {
  const [user, setUser] = useState<UserType>({
    token: "",
    user_id: -1,
    name: "",
  });
  return <User.Provider value={{ user, setUser }}>{children}</User.Provider>;
};

export const useUser = () => {
  return useContext(User);
};
