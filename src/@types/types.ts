export type UserContextProviderType = {
  children: React.ReactNode;
};

export type UserType = {
  token: string;
  name: string;
  user_id: number;
};

export type UserContextType = {
  user: UserType;
  setUser: (prop: any) => void;
  SaveUser: (props: UserType) => void;
  ReadUser: () => void;
};
