import { createAsyncThunk } from "@reduxjs/toolkit";
import { CartProps, ProductMinified } from "/@types/types";
import { CancelTokenSource } from "axios";
import http from "utils/service/http/http";

interface RemoveProductInput {
  cart_id: number;
  removeAll: boolean;
}

interface RemoveProductOutput {
  isDeleted: boolean;
  removeAll: boolean;
  cart_id: number;
}

export const removeCartProduct = createAsyncThunk<
  RemoveProductOutput,
  RemoveProductInput
>("cart/remove", async (input, reduxAPI) => {
  const response = await http(reduxAPI.getState()).delete(`/cart`, {
    params: {
      id: input.cart_id,

      ...(!!input.removeAll && { removeAll: true }),
    },
  });

  return {
    isDeleted: response.status === 200,
    removeAll: input.removeAll || false,
    cart_id: input.cart_id,
  };
});

interface AddProductInput {
  cancelToken: CancelTokenSource;
  prod_id: number;
}

interface AddProductOutput {
  isAdded: boolean;
  prod_id: number;
  product: CartProps;
}

export const addCartProduct = createAsyncThunk<
  AddProductOutput,
  AddProductInput
>("cart/add", async (input, reduxAPI) => {
  const response = await http(reduxAPI.getState()).post(
    `/cart`,
    {
      prod_id: input.prod_id,
    },
    { cancelToken: input.cancelToken.token }
  );

  return {
    isAdded: response.status === 201,
    prod_id: input.prod_id,
    product: response.data.product,
  };
});
