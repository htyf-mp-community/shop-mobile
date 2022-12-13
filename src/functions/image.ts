import { API } from "constants/routes";
import { ProductImageProps } from "/@types/types";

export function image(input: ProductImageProps[] | string | undefined): {
  uri: string;
} {
  if (typeof input === "string") {
    return { uri: `${API}/upload/images=${input}` };
  }

  if (typeof input?.length !== "undefined" && input.length > 0) {
    return { uri: `${API}/upload/images=${input[0].name}` };
  }

  return require("@assets/notfound.png");
}
