import Header from "@modules/Header";
import DailySale from "@modules/DailySale";
import Categories from "@modules/Categories";
import { ENDPOINTS } from "@constants/routes";
import ProductsCarusel from "@modules/ProductsCarusel/ProductsCarusel";
import Promotions from "modules/Promotions";

interface HomeProps {
  id: number;
  Component: any;
  props: any;
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
    {
      Component: Promotions,
      props: {},
    },
    {
      Component: DailySale,
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
