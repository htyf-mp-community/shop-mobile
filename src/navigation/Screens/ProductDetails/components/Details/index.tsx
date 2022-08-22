import React from "react";
import { View, Text } from "react-native";
import styles from "./styles";
import { Stars } from "modules/Stars/Stars";
import ReviewButtons from "../Buttons/ReviewButtons";
import type { DetailsProps, ProductRatingProps } from "/@types/types";
import Title from "./components/Title";
import DetailRow from "./components/DetailRow";
import TagsList from "./components/TagsList";
import {
  ButtonsLoader,
  SkeletonDescription,
  SkeletonRow,
} from "./components/Loaders";
import Description from "./components/Description";

interface IDetailsProps extends Omit<DetailsProps, "rating_id"> {
  showPrice?: boolean;
  rating_id?: ProductRatingProps[];
}

export default function Details({
  showPrice = true,
  rating_id = [],
  ...props
}: Partial<IDetailsProps>) {
  return (
    <View style={styles.container}>
      <Title title={props!.title || ""} />

      {props.rating === undefined ? (
        <SkeletonRow />
      ) : (
        <DetailRow
          containerStyle={{ paddingBottom: 5 }}
          buttonText="See more"
          children={
            <Stars rating={props.rating || 0} starStyle={styles.stars} />
          }
        />
      )}

      {props.price === undefined && showPrice && <SkeletonRow />}

      {!!props.price && showPrice && (
        <DetailRow
          buttonText="See more"
          children={<Text style={[styles.text]}>${props.price}</Text>}
        />
      )}

      {props.quantity === undefined ? (
        <SkeletonRow />
      ) : (
        <TagsList category={props.category} quantity={props.quantity} />
      )}

      {props.description !== undefined ? (
        <ReviewButtons
          thumbnail={props.image!}
          prod_id={props.prod_id!}
          sharedID={props.sharedID!}
          reviews={rating_id}
          name={props.title!}
        />
      ) : (
        <ButtonsLoader />
      )}

      {props.description === undefined ? (
        <SkeletonDescription />
      ) : (
        <Description description={props.description} />
      )}
    </View>
  );
}
