import { Button, Input, ValidatedInput } from "components";
import * as yup from "yup";
import { Formik } from "formik";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "constants/styles";
import { ScrollView } from "react-native";
import layout from "constants/layout";
import { useState } from "react";
import ImageUpload from "./ImageUpload";

const validationSchema = yup.object().shape({
  price: yup.number().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  title: yup.string().required(),
  manufactor: yup.string().required(),
});

const initialValues = {
  price: "0",
  description: "",
  category: "Unspecified",
  title: "",
  manufactor: "",
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
          price: +res.price,
          images: listOfImages,
          tags: "",
        })
      }
    >
      {(f) => (
        <ScrollView style={{ padding: 10, width: layout.screen.width }}>
          <ValidatedInput
            style={{ lineHeight: 25, textDecorationLine: "none" }}
            leftIcon={<Ionicons name="text" size={24} color="white" />}
            placeholder="Product's title"
            name="title"
            {...f}
          />
          <ValidatedInput
            multiline
            style={{ lineHeight: 25, textDecorationLine: "none" }}
            numberOfLines={f.values.description.split("\n").length}
            placeholder="Product's description"
            name="description"
            {...f}
          />
          <ValidatedInput
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
          <ValidatedInput style={{ lineHeight: 25 }} name="manufactor" {...f} />
          <ValidatedInput style={{ lineHeight: 25 }} name="category" {...f} />

          <ImageUpload
            images={listOfImages}
            handleSetImages={(img) => {
              setListOfImages((prev) => [...prev, img]);
            }}
          />

          <Button
            size="xl"
            style={{ width: "100%" }}
            type="contained"
            color="primary"
            text="Submit"
            callback={f.handleSubmit}
            disabled={!(f.isValid && f.dirty && disabled)}
          />
        </ScrollView>
      )}
    </Formik>
  );
}
