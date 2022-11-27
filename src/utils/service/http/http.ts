import axios from "axios";
import { API } from "../../../constants/routes";
//import store, { RootState } from "../../../redux/store";

export default (_store?: any) =>
  axios.create({
    baseURL: API,
    headers: {
      token:
        _store?.user.token ||
        require("redux/store").default.getState().user.token,
    },
  });
