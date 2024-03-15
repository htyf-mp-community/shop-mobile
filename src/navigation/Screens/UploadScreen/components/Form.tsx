import { Button, Input, ValidatedInput } from "components";
import * as yup from "yup";
import { Formik } from "formik";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors, Fonts } from "constants/styles";
import { ScrollView, View, KeyboardAvoidingView, Text } from "react-native";
import { useState } from "react";
import ImageUpload from "./ImageUpload";
import Tags from "./Tags";
import Select from "components/ui/Select/Select";
import useFetch from "utils/hooks/useFetch";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import Ripple from "react-native-material-ripple";

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
  tags: [] as any,
};

interface FormProps {
  onSubmit: (data: Object) => Promise<any>;

  disabled: boolean;
}

export default function Form({ onSubmit, disabled }: FormProps) {
  const [listOfImages, setListOfImages] = useState<string[]>([]);

  const { data, error } = useFetch("/products/categories", {
    cache: true,
  });

  const [step, setSteps] = useState(0);

  const navigation = useNavigation();

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
          tags: res.tags.join(", "),
        })
      }
    >
      {(f) => {
        return (
          <View style={{ flex: 1, paddingBottom: 10 }}>
            <View
              style={{
                padding: 10,
                flex: 1,
              }}
            >
              {step === 0 && (
                <>
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
                    style={{
                      lineHeight: 25,
                      textDecorationLine: "none",
                      textAlign: "left",
                      justifyContent: "flex-start",
                    }}
                    numberOfLines={10}
                    textAlign="left"
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
                </>
              )}

              {step === 1 && (
                <>
                  <Select
                    multiSelect
                    maxSelectHeight={300}
                    transparentOverlay={false}
                    containerStyle={{ marginBottom: 10 }}
                    selected={[f.values.category]}
                    renderDefaultItem
                    placeholderText="Select category"
                    setSelected={([_, selected]) => {
                      f.setFieldValue("category", selected);
                    }}
                    options={data as string[]}
                  />

                  <Select
                    multiSelect
                    maxSelectHeight={400}
                    transparentOverlay={false}
                    containerStyle={{ marginBottom: 15 }}
                    //prettier-ignore
                    options={["electronics","clothing","accessories","home decor","furniture","beauty","toys","books","sports","outdoor",]}
                    selected={f.values.tags || []}
                    setSelected={(v) => f.setFieldValue("tags", v)}
                  />

                  <ValidatedInput
                    leftIcon={
                      <MaterialIcons name="add" size={24} color="white" />
                    }
                    name="quantity"
                    style={{ lineHeight: 25, borderRadius: 10 }}
                    keyboardType="numeric"
                    helperText="How many of this product do you have?"
                    {...f}
                  />

                  <ImageUpload
                    images={listOfImages}
                    handleRemoveImage={(img) => {
                      setListOfImages((prev) => prev.filter((i) => i !== img));
                    }}
                    handleSetImages={(img) => {
                      setListOfImages((prev) => [...prev, img]);
                    }}
                  />
                </>
              )}
            </View>
            <Button
              onPress={() => {
                step === 0 ? setSteps(step + 1) : f.handleSubmit();
              }}
              variant="primary"
              type="contained"
              text={step === 0 ? "Next" : "Upload product"}
              size="xl"
              disabled={!f.isValid}
            />
          </View>
        );
      }}
    </Formik>
  );
}
