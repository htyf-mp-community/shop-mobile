import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { API } from "../../../constants/routes";
import { Colors } from "../../../constants/styles";
import { useUser } from "../../../context/UserContext";

interface PublishProps {
  route: RouteProp<any>;
  navigation: StackNavigationProp<any>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff",
  },
});

export default function Publish({ route, navigation }: PublishProps) {
  const [title, setTitle] = useState<any>("");
  const [description, setDescription] = useState<any>("");
  const [price, setPrice] = useState<any>("");
  const [category, setCategory] = useState<any>("");
  const { user } = useUser();

  async function HandleSubmit() {
    try {
      const { data } = await axios.post(
        `${API}/products/create`,
        {
          title,
          description,
          price: +price,
          category,
          expiration_date: "05.12.2021",
        },
        {
          headers: {
            token: user.token,
          },
        }
      );

      navigation.navigate("Home");
    } catch (error: any) {
      console.log(error.response.data);
      Alert.alert("Error during submition");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Input
        placeholderColor="#fff"
        labelStyle={{ color: "#fff", fontWeight: "400" }}
        name="Title"
        value={title}
        setValue={setTitle}
        placeholder="Your product's title..."
        style={styles.input}
      />
      <Input
        placeholderColor="#fff"
        labelStyle={{ color: "#fff", fontWeight: "400" }}
        name="Category"
        value={category}
        setValue={setCategory}
        placeholder="Your product's category..."
        style={styles.input}
      />
      <Input
        placeholderColor="#fff"
        labelStyle={{ color: "#fff", fontWeight: "400" }}
        name="Description"
        value={description}
        setValue={setDescription}
        placeholder="Your product's description..."
        style={styles.input}
        {...{
          multiline: true,
          numberOfLines: 10,
          scrollEnabled: true,
          textAlignVertical: "top",
        }}
      />
      <Input
        placeholderColor="#fff"
        labelStyle={{ color: "#fff", fontWeight: "400" }}
        name="Price"
        value={price}
        setValue={setPrice}
        placeholder="Your product's price..."
        style={styles.input}
        {...{ multiline: true }}
      />
      <Button
        text="SUBMIT"
        style={{ margin: 20, padding: 15, justifyContent: "center" }}
        variant="secondary"
        callback={HandleSubmit}
      />
    </ScrollView>
  );
}
