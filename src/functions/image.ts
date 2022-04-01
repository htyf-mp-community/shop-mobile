import { API } from "constants/routes";
import { ProductImageProps } from "/@types/types";
import { ImageSourcePropType } from "react-native";

export function image(
  input: ProductImageProps[] | string | undefined
): ImageSourcePropType {
  if (typeof input === "string") {
    return { uri: `${API}/upload/images=${input}` };
  }

  if (typeof input?.length !== "undefined") {
    return { uri: `${API}/upload/images=${input[0].name}` };
  }

  return require("@assets/notfound.png");
}
