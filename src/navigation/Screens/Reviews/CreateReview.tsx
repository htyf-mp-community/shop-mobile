import axios from "axios";
import React from "react";
import { useState } from "react";
import { View, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Message from "../../../components/Message/Message";
import { API } from "../../../constants/routes";
import { Colors } from "../../../constants/styles";
import { useUser } from "../../../context/UserContext";
import useListenKeyboard from "../../../hooks/useListenKeyboard";
import StarsTouch from "../../../modules/Stars/Stars";

const { width } = Dimensions.get("screen");

export default function CreateReview({ route }: any) {
  const { prod_id, thumbnail, sharedID } = route.params;
  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);

  const { status, variants } = useListenKeyboard();

  const [response, setResponse] = useState("");

  async function PostReview() {
    if (!title || !description || !rating) return;
    axios
      .post(
        `${API}/ratings/add`,
        { prod_id, description, title, rating },
        {
          headers: {
            token: user.token,
            "Content-Type": "application/json",
          },
        }
      )
      .then(({ data }) => setResponse(data.message))
      .catch((err) => {
        setResponse("Failed");
      });
  }

  return (
    <View style={styles.container}>
      {status === variants.closed && (
        <SharedElement id={`prod_id.${prod_id}${sharedID}`}>
          <Image
            source={{ uri: thumbnail }}
            style={styles.img}
            resizeMode="cover"
            resizeMethod="scale"
          />
        </SharedElement>
      )}

      {!!response && <Message status={response} />}

      <ScrollView style={styles.form}>
        <StarsTouch setRating={setRating} />
        <Input
          name="Title"
          value={title}
          setValue={setTitle}
          placeholder="Rating's title"
          style={styles.input}
          placeholderColor="white"
          labelStyle={{ color: "white", paddingBottom: 5 }}
        />
        <Input
          name="Description"
          value={description}
          setValue={setDescription}
          placeholder="Describe your feelings about the product"
          style={styles.input}
          placeholderColor="white"
          labelStyle={{ color: "white", paddingBottom: 5 }}
          {...{
            multiline: true,
            numberOfLines: 10,
            scrollEnabled: true,
            textAlignVertical: "top",
          }}
        />
        <View style={{ width, alignItems: "center" }}>
          <Button
            text="Submit"
            callback={PostReview}
            style={{
              width: width * 0.9,
              backgroundColor: Colors.secondary,
              color: Colors.text,
              marginTop: 20,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  img: {
    width,
    height: 200,
  },
  form: {
    width,
  },
  input: {
    borderColor: "white",
    borderWidth: 0.5,
    color: "white",
  },
  stars: {},
});
