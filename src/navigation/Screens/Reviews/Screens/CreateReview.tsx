import { Formik } from "formik";
import React from "react";
import { useState } from "react";
import { View, Image, KeyboardAvoidingView } from "react-native";
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
  const { prod_id, thumbnail, sharedID } = route.params;
  const [rating, setRating] = useState(0);
  const { status, variants } = useListenKeyboard();
  const { response, upload, setResponse } = useUploadReview();

  return (
    <View style={styles.container}>
      {status === variants.closed && (
        <View style={{ alignItems: "center" }}>
          <SharedElement id={`prod_id.${prod_id}${sharedID}`}>
            <Image
              source={{ uri: thumbnail }}
              style={styles.img}
              resizeMode="cover"
              resizeMethod="scale"
            />
          </SharedElement>
        </View>
      )}

      <ResponseModal
        state={response}
        onCloseModal={() => setResponse({})}
        onSuccess={() => navigation?.navigate("Home")}
        isVisible={response.hasFinished || false}
      />

      <KeyboardAvoidingView style={{ alignItems: "center" }}>
        <Formik
          initialValues={{
            description: "",
            title: "",
          }}
          validationSchema={schema}
          onSubmit={(data) => upload({ ...data, prod_id, rating })}
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
                placeholder="What other's should know"
                name={"Title"}
                helperText={errors.title || "Atleast 6 characters*"}
                error={!!errors.title && touched.title}
                style={styles.input}
              />
              <Input
                value={values.description}
                setValue={handleChange("description")}
                onBlur={handleBlur("description")}
                placeholder="Say something more about your expirience"
                name={"Description"}
                helperText={errors.description || "Atleast 6 characters*"}
                style={styles.input}
                error={!!errors.description && touched.description}
                scrollEnabled
                multiline
                textAlignVertical="top"
                numberOfLines={5}
              />

              <Button
                variant="primary"
                disabled={!(isValid && dirty && rating)}
                text="Add review"
                callback={() => handleSubmit()}
                style={[styles.button]}
              />
            </>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </View>
  );
}
