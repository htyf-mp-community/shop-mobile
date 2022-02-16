import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type UserContextProviderType = {
  children: React.ReactNode;
  onSplashScreen: () => void;
};

export interface ProductImageProps {
  id: number;
  name: string;
}

export interface ProductRatingProps {
  rating_id: number;
  user_id: number;
  rating: number;
  title: string;
  description: string;
}

export interface Product {
  prod_id: number;
  price: number;
  discount_price: number | null | undefined;
  title: string;
  expiration_date: string;
  description: string;
  category: string;
  img_id: ProductImageProps[];
  rating_id: ProductRatingProps[];
  manufacturer: string;
  vendor: {
    id?: number;
    email?: string;
    name?: string;
    surname?: string;
  };
  quantity: number;
}

export type UserType = {
  token: string;
  name: string;
  user_id: number;
  isLoggedIn: boolean;
  isLoading: boolean;
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
  Search: undefined;
  Home: undefined;
  PurchaseHistory: undefined;
  Cart: undefined;
  User: undefined;
  Auth?: undefined;
  Landing: undefined;
  Register?: undefined;
  Login?: undefined;
  MyReviews: undefined;
  AccountSettings: undefined;
  SearchResults: { result: any[]; length: number };
  Details: {
    prod_id: number;
    sharedID: string;
    image: string;
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

export type useNavigationProps = StackNavigationProp<RootStackParams>;

export interface ScreenNavigationProps<T extends keyof RootStackParams> {
  route: RouteProp<RootStackParams, T>;
  navigation?: StackNavigationProp<RootStackParams>;
}

export interface SuggestionType {
  image: string;
  prod_id: number;
  title: string;
  price: number;
}

export interface HistoryResponse {
  hasMore: boolean;
  results: {
    product: Product;
    details: {
      purchase_id: number;
      date: string;
      status: string;
    };
  }[];
}
