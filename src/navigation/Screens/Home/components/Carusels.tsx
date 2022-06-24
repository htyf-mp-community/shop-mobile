import ProductsCarusel from "modules/ProductsCarusel/ProductsCarusel";
import { ENDPOINTS } from "constants/routes";

export default function Carusels() {
  return (
    <>
      <ProductsCarusel
        {...{
          title: "Best Rated",
          sharedID: "MostSearched",
          path: ENDPOINTS.goodRatedProducts,
          refresh: false,
        }}
      />
      <ProductsCarusel
        {...{
          title: "Recently searched",
          sharedID: "WatchedByYou",
          path: ENDPOINTS.searchedProducts,
          refresh: false,
        }}
      />
      <ProductsCarusel
        {...{
          title: "Products",
          sharedID: "All",
          path: ENDPOINTS.productsAll,
          refresh: false,
        }}
      />
    </>
  );
}
