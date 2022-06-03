import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./styles";
import Delivery from "@modules/Delivery";
import { Stars } from "modules/Stars/Stars";
import Ripple from "react-native-material-ripple";
import { Available } from "components";
import Banner from "../Banner";
import Color from "color";
import ReviewButtons from "../Buttons/ReviewButtons";
import type { DetailsProps } from "/@types/types";
import { Fonts } from "constants/styles";

const color = "rgba(255,255,255,0.8)";

export default function Details(props: DetailsProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.between]}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
      <View style={[styles.row, styles.between, { paddingBottom: 5 }]}>
        <Stars rating={props.rating} starStyle={styles.stars} />
        <Ripple rippleColor="#fff" style={styles.button}>
          <Text style={{ color }}>See more</Text>
        </Ripple>
      </View>
      <View style={[styles.row, styles.between]}>
        <Text style={[styles.text]}>${props.price}</Text>
        <Ripple rippleColor="#fff" style={styles.button}>
          <Text style={{ color }}>See simmilar</Text>
        </Ripple>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={[styles.row, { paddingBottom: 10 }]}
      >
        <Delivery />
        <View style={{ marginRight: 10 }} />
        <Available quantity={props.quantity} />
        <View style={{ marginRight: 10 }} />
        <Banner
          text="Premium product"
          color="red"
          backgroundColor={Color("red").alpha(0.15).string()}
        />
        <Banner
          text={props.category}
          color="white"
          backgroundColor={Color("gray").alpha(0.1).string()}
        />
      </ScrollView>

      <ReviewButtons
        thumbnail={props.image}
        prod_id={props.prod_id}
        sharedID={props.sharedID}
        reviews={props.rating_id}
        name={props.title}
      />

      <Text
        style={{
          color,
          fontSize: 19,
          fontFamily: Fonts.PoppinsRegular,
        }}
      >
        {props.description}
      </Text>
    </View>
  );
}
