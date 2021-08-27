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

export type RootStackParams = {
  initialRouteName: Object | undefined;
  Home: undefined;
  Cart: undefined;
  User: undefined;
  Auth?: undefined;
  SearchResults: { result: any[]; length: number };
  Details: {
    prod_id: number;
    sharedID: string;
    image: string;
    imgPath: string;
  };
  CreateReview: {
    prod_id: number;
    thumbnail: string;
    sharedID: string;
    prod_name: string;
  };
  ProductReviews: { reviews: any[] };
  Checkout: { cart: any; total: number };
};
