import { memo } from "react";
import { ScrollView, View } from "react-native";
import ImagesCarusel from "@modules/ImagesCarusel/ImagesCarusel";
import ProductDetailsText from "./components/ProductDetailsText/ProductDetailsText";
import ProductDetailsButtons from "./components/ProductDetailsButtons/ProductDetailsButtons";
import { ProductImageProps, ScreenNavigationProps } from "/@types/types";
import styles from "./styles";
import useColorTheme from "@utils/context/ThemeContext";
import ProductSuggestion from "./components/Suggestions/ProductSuggestion";
import BottomTab from "./components/BottomTab/BottomTab";
import { useQuery } from "@apollo/client";
import { useUser } from "utils/context/UserContext";
import { GET_PRODUCT } from "./schema";
import DetailsLoader from "./components/Loader";

function ProductDetails({ route }: Required<ScreenNavigationProps<"Details">>) {
  const { prod_id, image, sharedID } = route.params;

  const { user } = useUser();
  const { data, loading } = useQuery(GET_PRODUCT, {
    variables: {
      prod_id,
    },
    context: {
      headers: {
        token: user.token,
      },
    },
  });

  const result = data?.product || {};
  const imgList = result?.img_id as ProductImageProps[];
  const images =
    imgList?.length > 1 ? [...imgList].splice(1, imgList.length) : [];
  const { theme } = useColorTheme();

  return (
    <View style={{ flex: 1, backgroundColor: theme.primary }}>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.primary }]}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        bounces
      >
        <ImagesCarusel
          sharedID={sharedID}
          prod_id={prod_id}
          image={image}
          images={images}
        />

        <DetailsLoader loading={loading} />

        {!loading && result && (
          <>
            <ProductDetailsText {...result} />
            <ProductDetailsButtons
              thumbnail={image}
              prod_id={prod_id}
              sharedID={sharedID}
              reviews={result.rating_id}
              name={result.title}
            />
            <ProductSuggestion text={result.title} />
          </>
        )}
      </ScrollView>
      <BottomTab
        prod_id={prod_id}
        quantity={(result?.quantity as number) || 0}
      />
    </View>
  );
}

export default memo(ProductDetails);
