export type UserContextProviderType = {
  children: React.ReactNode;
};

export type UserType = {
  token: string;
  name: string;
  user_id: number;
  isLoggedIn: boolean;
};

export type UserContextType = {
  user: UserType;
  setUser: (prop: any) => void;
  SaveUser: (props: any) => void;
  ReadUser: () => void;
  RemoveUser: () => void;
};

export type RootStackParams = {
  initialRouteName: Object | undefined;
  Home: undefined;
  Cart: undefined;
  User: undefined;
  Auth?: undefined;
  Landing: undefined;
  Register?: undefined;
  Login?: undefined;
  SearchResults: { result: any[]; length: number };
  Details: {
    prod_id: number;
    sharedID: string;
    image: string;
    imgPath: string;
    title: string;
  };
  CreateReview: {
    prod_id: number;
    thumbnail: string;
    sharedID: string;
    prod_name: string;
  };
  ProductReviews: {
    reviews: any[];
    prod_name: string;
    prod_id: number;
    sharedID: string;
  };
  Checkout: { cart: any[]; total: number };
};
