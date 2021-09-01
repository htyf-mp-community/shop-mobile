export const API = "http://192.168.0.25:3000";

export const ENDPOINTS = {
  //
  cartAdd: `${API}/cart/add-to-cart`,
  cart: `${API}/cart`,
  cartDelete: `${API}/cart/`, // + prod_id,
  //
  history: `${API}/payments/history`,
  purchase: `${API}/payments/purchase`,
  //
  notificationsAddToken: `${API}/notifications/upload-token`,
  notificationsSettings: `${API}/notifications/settings`,
  //
  productsAll: `${API}/products`,
  searchProducts: `${API}/products/searched=`, // text
  searchHistory: `${API}/products/search-history`,
  searchedProducts: `${API}/products/searched-products`,
  searchCategory: `${API}/products/category=`, // category
  searchById: `${API}/products/id=`, //id
  goodRatedProducts: `${API}/products/good-rated`,
  //
  login: `${API}/auth/login`,
  register: `${API}/auth/register`,
};
