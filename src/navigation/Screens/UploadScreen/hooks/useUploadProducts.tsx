import http from "utils/service/http/http";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useNavigationProps } from "/@types/types";
import { image } from "functions/image";
import { wait } from "functions/wait";

export interface UploadProps {
  price: number;
  description: string;
  category: string;
  title: string;
  manufacturer: string;
  images: string[];
  tags: string;
  quantity: number;
}

function transformImages(images: string[]) {
  return images.map((img) => img.replace("file://", ""));
}

export const handleUploadImage = async (
  image: string,
  prodId: number | string
) => {
  const formData = new FormData() as any;
  formData.append("image", {
    type: "image/jpg",
    name: "UploadImage",
    uri: image,
  });
  const response = await http().post("/upload/" + prodId, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const handleUploadProduct = async (product: UploadProps) => {
  try {
    const response = await http().post("/products", {
      ...product,
    });

    const prodId = response.data.id as number;

    const images = product.images.map((img) => handleUploadImage(img, prodId));

    const imgs = await Promise.all(images);

    return { prodId, images: imgs.map((i) => i.filename) };
  } catch (error) {}
};

export default function useUploadProducts() {
  const [loading, setLoading] = React.useState(false);

  const [error, setError] = React.useState("");

  const [finished, setFinished] = React.useState(false);

  const [clicked, setClicked] = React.useState(false);

  const navigation = useNavigation<useNavigationProps>();

  const handleUploadFinalAsync = async (product: UploadProps) => {
    setLoading(true);
    try {
      setClicked(true);

      await wait(2000);

      const response = await handleUploadProduct(product);

      navigation.navigate("Product", {
        image: image(response!.images[0]).uri,
        prod_id: response!.prodId,
        sharedID: "",
        title: product.title,
        isSharedAnimationUsed: false,
      });

      setFinished(true);
    } catch (error) {
      setError(JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return {
    handleUploadFinalAsync,
    state: { loading, error, finished, clicked },
    handleUploadImage,
  };
}
