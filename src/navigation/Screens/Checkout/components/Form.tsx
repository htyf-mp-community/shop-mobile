import { Formik } from "formik";
import { useAppSelector } from "utils/hooks/hooks";
import checkoutSchema from "../helpers/checkoutSchema";
import { Button } from "components/index";
import { Dimensions } from "react-native";
import Row from "./Row";
import { ScrollView } from "react-native-gesture-handler";
import { ValidatedInput } from "../helpers/input_helpers";
import Separator from "./Separator";

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
        phone: credentials?.phone_number || "",
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
            <ValidatedInput formik={f} name="name" style={inputWidth} />

            <ValidatedInput formik={f} name="surname" style={inputWidth} />

            <Separator text="Contact Information" />

            <ValidatedInput formik={f} name="street" style={inputWidth} />

            <Row>
              <ValidatedInput
                formik={f}
                name="apartment_number"
                style={{ width: width / 2 - 15 }}
                label="Apartment nr"
              />
              <ValidatedInput
                formik={f}
                name="city"
                style={{ width: width / 2 - 15 }}
              />
            </Row>

            <ValidatedInput
              placeholder="+00 000 000 000"
              formik={f}
              name="phone"
              style={inputWidth}
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
