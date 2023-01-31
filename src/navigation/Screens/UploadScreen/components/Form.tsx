import { Button, Input, ValidatedInput } from "components";
import * as yup from "yup";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "constants/styles";
import { ScrollView } from "react-native";
import { useState } from "react";
import ImageUpload from "./ImageUpload";
import Tags from "./Tags";

const validationSchema = yup.object().shape({
  price: yup.number().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  title: yup.string().required(),
  manufactor: yup.string().required(),
  quantity: yup.number().required(),
});

const initialValues = {
  price: "0",
  description: "",
  category: "Unspecified",
  title: "",
  manufactor: "",
  quantity: "0",
};

interface FormProps {
  onSubmit: (data: Object) => Promise<any>;

  disabled: boolean;
}

export default function Form({ onSubmit, disabled }: FormProps) {
  const [listOfImages, setListOfImages] = useState<string[]>([]);

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={(res) =>
        onSubmit({
          ...res,
          manufacturer: res.manufactor,
          quantity: +res.quantity,
          price: +res.price,
          images: listOfImages,
          tags: `${res.title.split(" ").join(",")},${res.manufactor},${
            res.category
          }`,
        })
      }
    >
      {(f) => {
        return (
          <ScrollView
            style={{
              padding: 10,
              flex: 1,
            }}
          >
            <ValidatedInput
              style={{ lineHeight: 25, textDecorationLine: "none" }}
              leftIcon={<Ionicons name="text" size={24} color="white" />}
              placeholder="Product's title"
              name="title"
              helperText="What's the name of the product?"
              {...f}
            />
            <ValidatedInput
              multiline
              style={{ lineHeight: 25, textDecorationLine: "none" }}
              numberOfLines={f.values.description.split("\n").length}
              placeholder="Product's description"
              name="description"
              helperText="Describe the product in detail 200+ characters"
              {...f}
            />
            <ValidatedInput
              helperText="Price in $"
              style={{ lineHeight: 25 }}
              leftIcon={
                <MaterialIcons
                  name="attach-money"
                  size={25}
                  color={!!f.errors.price ? Colors.error : "#fff"}
                />
              }
              keyboardType="numeric"
              name="price"
              {...f}
            />
            <ValidatedInput
              style={{ lineHeight: 25 }}
              name="manufactor"
              helperText="Product's manufacturer"
              {...f}
            />
            <ValidatedInput
              style={{ lineHeight: 25 }}
              name="category"
              helperText="What's product category e.g Electronic, Food ..."
              {...f}
            />

            <ValidatedInput
              leftIcon={<MaterialIcons name="add" size={24} color="white" />}
              name="quantity"
              style={{ lineHeight: 25 }}
              keyboardType="numeric"
              helperText="How many of this product do you have?"
              {...f}
            />

            <Tags tagName="helo" />

            <ImageUpload
              images={listOfImages}
              handleRemoveImage={(img) => {
                setListOfImages((prev) => prev.filter((i) => i !== img));
              }}
              handleSetImages={(img) => {
                setListOfImages((prev) => [...prev, img]);
              }}
            />

            <Button
              size="xl"
              style={{ width: "100%", marginBottom: 20 }}
              type="contained"
              color="primary"
              text="Submit"
              callback={() => f.handleSubmit()}
              disabled={!(f.isValid && f.dirty && disabled)}
            />
          </ScrollView>
        );
      }}
    </Formik>
  );
}
