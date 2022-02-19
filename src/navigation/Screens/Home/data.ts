import Header from "@modules/Header";
import DailySale from "@modules/DailySale";
import Categories from "@modules/Categories";
import { ENDPOINTS } from "@constants/routes";
import ProductsCarusel from "@modules/ProductsCarusel/ProductsCarusel";

interface HomeProps {
  id: number;
  Component: any;
  props: any;
}

export const homeElements = (toggle: () => void): HomeProps[] => [
  {
    id: 1,
    Component: Header,
    props: {
      toggleSidebar: toggle,
    },
  },
  {
    id: 2,
    Component: Categories,
    props: {},
  },
  {
    id: 3,
    Component: DailySale,
    props: {},
  },
  {
    id: 4,
    Component: ProductsCarusel,
    props: {
      title: "Best Rated",
      sharedID: "MostSearched",
      path: ENDPOINTS.goodRatedProducts,
      refresh: false,
    },
  },
  {
    id: 5,
    Component: ProductsCarusel,
    props: {
      title: "Your searches",
      sharedID: "WatchedByYou",
      path: ENDPOINTS.searchedProducts,
      refresh: false,
    },
  },
  {
    id: 6,
    Component: ProductsCarusel,
    props: {
      title: "All products",
      sharedID: "All",
      path: ENDPOINTS.productsAll,
      refresh: false,
    },
  },
];
