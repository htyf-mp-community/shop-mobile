import { Formik } from "formik";
import React from "react";
import { useState } from "react";
import {
  View,
  Image,
  KeyboardAvoidingView,
  Text,
  ScrollView,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { ScreenNavigationProps } from "/@types/types";
import { Button, Input } from "@components/index";
import useListenKeyboard from "utils/hooks/useListenKeyboard";
import StarsTouch from "@modules/Stars/Stars";
import schema from "../schema";
import { createStyles as styles } from "../Reviews.styles";
import ResponseModal from "../components/ResponseModal";
import useUploadReview from "../hooks/useUploadReview";

export default function CreateReview({
  route,
  navigation,
}: ScreenNavigationProps<"CreateReview">) {
  const { prod_id, thumbnail, sharedID, prod_name } = route.params;
  const [rating, setRating] = useState(0);
  const { status, variants } = useListenKeyboard();
  const { response, upload, setResponse } = useUploadReview();

  return (
    <ScrollView style={styles.container}>
      <View style={{ flexDirection: "row", padding: 10 }}>
        <SharedElement id={`prod_id.${prod_id}${sharedID}`}>
          <Image
            source={{ uri: thumbnail }}
            style={styles.img}
            resizeMode="cover"
            resizeMethod="scale"
          />
        </SharedElement>

        <View
          style={{
            paddingHorizontal: 10,
            justifyContent: "flex-start",
          }}
        >
          <Text
            textBreakStrategy="highQuality"
            lineBreakMode="clip"
            numberOfLines={4}
            style={{
              color: "#fff",
              fontSize: 20,
              fontWeight: "bold",
              width: 225,
            }}
          >
            {prod_name}
          </Text>
        </View>
      </View>

      <ResponseModal
        state={response}
        onCloseModal={() => setResponse({})}
        onSuccess={() => navigation?.navigate("Home")}
        isVisible={response.hasFinished || false}
      />

      <KeyboardAvoidingView behavior="padding" style={{ alignItems: "center" }}>
        <Formik
          initialValues={{
            description: "",
            title: "",
          }}
          validationSchema={schema}
          onSubmit={(data) =>
            upload({
              variables: {
                ...data,
                prod_id,
                rating,
              },
            })
          }
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            isValid,
            values,
            dirty,
            touched,
          }) => (
            <>
              <StarsTouch setRating={setRating} />
              <Input
                value={values.title}
                setValue={handleChange("title")}
                onBlur={handleBlur("title")}
                placeholder="Review's title"
                //name={"Title"}
                helperText={errors.title || "Atleast 6 characters*"}
                error={!!errors.title && touched.title}
                style={styles.input}
                placeholderTextColor={"gray"}
              />
              <Input
                placeholderTextColor={"gray"}
                value={values.description}
                setValue={handleChange("description")}
                onBlur={handleBlur("description")}
                placeholder="Say something more about your expirience"
                // name={"Description"}
                helperText={errors.description || "Atleast 6 characters*"}
                style={styles.input}
                error={!!errors.description && touched.description}
                scrollEnabled
                multiline
                textAlignVertical="top"
                numberOfLines={5}
              />

              <Button
                type="contained"
                variant="primary"
                disabled={!(isValid && dirty && rating)}
                text="submit"
                callback={() => handleSubmit()}
                style={[styles.button]}
              />
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
