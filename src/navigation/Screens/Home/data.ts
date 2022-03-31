import Header from "@modules/Header";
import DailySale from "@modules/DailySale";
import Categories from "@modules/Categories";
import { ENDPOINTS } from "@constants/routes";
import ProductsCarusel from "@modules/ProductsCarusel/ProductsCarusel";
import AuctionsNavigator from "modules/AuctionsNavigator";
/* import Promotions from "modules/Promotions";
import AuctionList from "../Auction/components/AuctionList"; */

interface HomeProps {
  id: number;
  Component: React.ElementType;
  props: {
    [key: string]: string | boolean | (() => void) | number | undefined;
  };
}

export const homeElements = (toggle: () => void): readonly HomeProps[] =>
  [
    {
      Component: Header,
      props: {
        toggleSidebar: toggle,
      },
    },
    {
      Component: Categories,
      props: {},
    },
    /*  {
      Component: Promotions,
      props: {},
    },
    {
      Component: AuctionList,
      props: {},
    }, */
    {
      Component: DailySale,
      props: {},
    },
    {
      Component: AuctionsNavigator,
      props: {},
    },
    {
      Component: ProductsCarusel,
      props: {
        title: "Best Rated",
        sharedID: "MostSearched",
        path: ENDPOINTS.goodRatedProducts,
        refresh: false,
      },
    },
    {
      Component: ProductsCarusel,
      props: {
        title: "Your searches",
        sharedID: "WatchedByYou",
        path: ENDPOINTS.searchedProducts,
        refresh: false,
      },
    },
    {
      Component: ProductsCarusel,
      props: {
        title: "All products",
        sharedID: "All",
        path: ENDPOINTS.productsAll,
        refresh: false,
      },
    },
  ].map((props, index) => ({ ...props, id: index }));
