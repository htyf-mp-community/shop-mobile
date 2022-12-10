import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "redux/store";
import http from "utils/service/http/http";

export enum WatchlistStatus {
  CONTAINS = "IN",
  DOES_NOT_CONTAIN = "NOT_IN",
  UNKNOWN = "UNKNOWN",
}

export interface WatchlistState {}

interface CheckArgs {
  prod_id: number;
}

interface CheckResponse {}

export const checkElementStatus = createAsyncThunk(
  "watchlist/checkElementStatus",
  async (prod_id: number, api) => {
    try {
      const response = await http(api.getState() as RootState).post(
        "/watchlist/check",
        { prod_id }
      );

      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

export const addProduct = createAsyncThunk(
  "watchlist/addProduct",
  async (prod_id: number, api) => {
    try {
      const response = await http(api.getState() as RootState).post(
        "/watchlist",
        { prod_id }
      );

      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  }
);

export const removeProduct = createAsyncThunk(
  "watchlist/removeProduct",
  async (prod_id: number, api) => {
    try {
      const response = await http(api.getState() as RootState).delete(
        "/watchlist/" + prod_id
      );

      return {
        ...response.data,
        prod_id,
      };
    } catch (error: any) {
      return error.response.data;
    }
  }
);
