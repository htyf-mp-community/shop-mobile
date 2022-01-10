import axios from "axios";
import React from "react";
import { useState } from "react";
import { View, Image, ScrollView } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { ScreenNavigationProps } from "../../../@types/types";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import Message from "../../../components/Message/Message";
import { API } from "../../../constants/routes";
import { useUser } from "../../../context/UserContext";
import useListenKeyboard from "../../../hooks/useListenKeyboard";
import StarsTouch from "../../../modules/Stars/Stars";
import { createStyles as styles } from "./styles";

export default function CreateReview({
  route,
}: ScreenNavigationProps<"CreateReview">) {
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
        `${API}/ratings`,
        { prod_id, description, title, rating },
        {
          headers: {
            token: user.token,
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => setResponse("Success"))
      .catch(() => {
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

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <StarsTouch setRating={setRating} />
        <Input
          value={title}
          setValue={setTitle}
          placeholder="Title"
          style={styles.input}
          placeholderColor="white"
          labelStyle={{ paddingBottom: 5, color: "#fff" }}
        />
        <Input
          value={description}
          setValue={setDescription}
          placeholder="Description"
          style={styles.input}
          placeholderColor="white"
          labelStyle={{ paddingBottom: 5, color: "#fff" }}
          scrollEnabled
          multiline
          textAlignVertical="top"
          numberOfLines={5}
        />

        <Button text="Add review" callback={PostReview} style={styles.button} />
      </ScrollView>
    </View>
  );
}
