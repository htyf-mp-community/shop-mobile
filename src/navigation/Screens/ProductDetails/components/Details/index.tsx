import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { Stars } from "modules/Stars/Stars";
import ReviewButtons from "../Buttons/ReviewButtons";
import type { DetailsProps, ProductRatingProps } from "/@types/types";
import Title from "./components/Title";
import DetailRow from "./components/DetailRow";

import { Skeleton } from "./components/Loaders";
import Description from "./components/Description";
import Taglist from "components/Taglist/Taglist";
import tags from "./assets/tags";
import SellerTile from "../SellerTile/SellerTile";

interface IDetailsProps extends Omit<DetailsProps, "rating_id"> {
  showPrice?: boolean;
  rating_id?: ProductRatingProps[];
  manufacturer?: string;
  isLoading?: boolean;
}

export default function Details({
  showPrice = true,
  rating_id = [],
  isLoading,
  ...props
}: Partial<IDetailsProps>) {
  if (isLoading) return <Skeleton />;

  return (
    <View style={styles.container}>
      <Title title={props!.title || ""} />

      <SellerTile
        seller={{
          name: props?.manufacturer || "",
          image: props?.image || "",
        }}
      />

      <DetailRow
        containerStyle={{ paddingBottom: 5 }}
        buttonText="See more"
        children={<Stars rating={props.rating || 0} starStyle={styles.stars} />}
      />

      {showPrice && (
        <DetailRow
          buttonText="See more"
          children={<Text style={[styles.text]}>${props.price}</Text>}
        />
      )}

      <Taglist tagsList={tags} />

      <ReviewButtons
        thumbnail={props.image!}
        prod_id={props.prod_id!}
        sharedID={props.sharedID!}
        reviews={rating_id}
        name={props.title!}
      />

      <Description description={props!.description as string} />
    </View>
  );
}
