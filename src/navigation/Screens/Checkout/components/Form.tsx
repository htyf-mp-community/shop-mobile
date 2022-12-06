import { Formik } from "formik";
import { useAppSelector } from "utils/hooks/hooks";
import checkoutSchema from "../helpers/checkoutSchema";
import { Button } from "components/index";
import { Dimensions } from "react-native";
import Row from "./Row";
import { ScrollView } from "react-native-gesture-handler";
import { ValidatedInput } from "@components/index";
import Separator from "./Separator";

import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("screen");

interface FormProps {
  onSubmit: (v: any) => void;
}

export default function Form({ onSubmit }: FormProps) {
  const { credentials } = useAppSelector((st) => st.user);
  const inputWidth = { width: width - 20 };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: credentials?.name || "",
        surname: credentials?.surname || "",
        street: "",
        apartment_number: "",
        city: "",
        phone: credentials.phone_number ? "+48" + credentials.phone_number : "",
      }}
      onSubmit={onSubmit}
      validationSchema={checkoutSchema}
      validateOnChange
    >
      {(f) => {
        return (
          <ScrollView
            style={{ width }}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <Separator text="Personal Information" />
            <ValidatedInput
              name="name"
              style={inputWidth}
              leftIcon={<AntDesign name="user" size={20} color="white" />}
              {...f}
            />

            <ValidatedInput
              name="surname"
              style={inputWidth}
              leftIcon={<AntDesign name="user" size={20} color="white" />}
              {...f}
            />

            <Separator text="Contact Information" />

            <ValidatedInput name="street" style={inputWidth} {...f} />

            <Row>
              <ValidatedInput
                name="apartment_number"
                style={{ width: width / 2 - 15 }}
                label="Apartment nr"
                {...f}
              />
              <ValidatedInput
                name="city"
                style={{ width: width / 2 - 15 }}
                {...f}
              />
            </Row>

            <ValidatedInput
              placeholder="+00 000 000 000"
              name="phone"
              style={inputWidth}
              {...f}
            />

            <Button
              type="contained"
              color="primary"
              borderRadius="full"
              disabled={!(f.isValid && f.dirty)}
              text="Proceed to confirm"
              style={{
                paddingVertical: 20,
                marginVertical: 15,
                width: width - 20,
              }}
              onPress={() => f.handleSubmit()}
            />
          </ScrollView>
        );
      }}
    </Formik>
  );
}
