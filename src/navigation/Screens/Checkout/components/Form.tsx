import { Formik } from "formik";
import { useAppDispatch, useAppSelector } from "utils/hooks/hooks";
import checkoutSchema from "../helpers/checkoutSchema";
import { Input, Button } from "components/index";
import { View, Text, Dimensions } from "react-native";
import { Fonts } from "constants/styles";
import { FC } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { checkoutActions } from "redux/Checkout";

const { width } = Dimensions.get("screen");

interface FormProps {
  onSubmit: (v: any) => void;
}

const Separator = ({ text }: { text: string }) => (
  <Text
    style={{
      fontFamily: Fonts.PoppinsMedium,
      color: "#fff",
      fontSize: 22,
      padding: 10,
      paddingHorizontal: 15,
      width,
    }}
  >
    {text}
  </Text>
);

const Row: FC = ({ children }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      width,
      paddingHorizontal: 10,
      paddingVertical: 5,
    }}
  >
    {children}
  </View>
);

export default function Form({ onSubmit }: FormProps) {
  const { credentials } = useAppSelector((st) => st.user);
  const dispatch = useAppDispatch();
  const inputWidth = { width: width - 20 };

  function handleSubmit(credentials: any) {
    dispatch(checkoutActions.setCredentials(credentials));
    onSubmit(undefined);
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: credentials?.name || "",
        surname: credentials?.surname || "",
        street: "",
        apartment_number: "",
        city: "",
        phone: credentials?.phone_number || "",
      }}
      onSubmit={handleSubmit}
      validationSchema={checkoutSchema}
      validateOnChange
    >
      {({
        handleChange,
        handleBlur,
        isValid,
        handleSubmit,
        values,
        errors,
        dirty,
        touched,
      }) => {
        return (
          <ScrollView
            style={{ width }}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <Separator text="Personal Information" />
            <Input
              style={inputWidth}
              value={values.name}
              onChangeText={handleChange("name")}
              name={!!errors.name && touched.name ? errors.name : "Name"}
              placeholder="Name"
              onBlur={handleBlur("name")}
              error={!!errors.name && touched.name}
            />

            <Input
              style={inputWidth}
              value={values.surname}
              onChangeText={handleChange("surname")}
              name={
                !!errors.surname && touched.surname ? errors.surname : "Surname"
              }
              placeholder="Surname"
              error={!!errors.surname && touched.surname}
              onBlur={handleBlur("surname")}
            />

            <Separator text="Contact Information" />

            <Input
              style={inputWidth}
              value={values.street}
              onChangeText={handleChange("street")}
              name={
                !!errors.street && touched.street ? errors.street : "Street"
              }
              placeholder="street"
              error={!!errors.street && touched.street}
              onBlur={handleBlur("street")}
            />

            <Row>
              <Input
                style={{ width: width / 2 - 15 }}
                value={values.apartment_number}
                onChangeText={handleChange("apartment_number")}
                name={
                  !!errors.apartment_number && touched.apartment_number
                    ? errors.apartment_number
                    : "Apartment nr"
                }
                placeholder=""
                error={!!errors.apartment_number && touched.apartment_number}
                onBlur={handleBlur("apartment_number")}
              />
              <Input
                style={{ width: width / 2 - 15 }}
                value={values.city}
                onChangeText={handleChange("city")}
                name={!!errors.city && touched.city ? errors.city : "City"}
                placeholder="City"
                error={!!errors.city && touched.city}
                onBlur={handleBlur("city")}
              />
            </Row>

            <Input
              style={inputWidth}
              value={values.phone.toString()}
              onChangeText={handleChange("phone")}
              name={
                !!errors.phone && touched.phone ? errors.phone : "Phone number"
              }
              placeholder="000-000-000"
              error={!!errors.phone && touched.phone}
              onBlur={handleBlur("phone")}
            />

            <Button
              variant="primary"
              borderRadius="full"
              disabled={!(isValid && dirty)}
              text="Proceed to confirm"
              style={{
                paddingVertical: 20,
                marginVertical: 15,
                width: width - 20,
              }}
              onPress={() => handleSubmit()}
            />
          </ScrollView>
        );
      }}
    </Formik>
  );
}
