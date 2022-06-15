import { Formik } from "formik";
import { useAppSelector } from "utils/hooks/hooks";
import styles, { cardFieldStyles } from "../styles";
import checkoutSchema from "../checkoutSchema";
import { AntDesign } from "@expo/vector-icons";
import { CardField } from "@stripe/stripe-react-native";
import { Input, Button } from "components/index";

interface FormProps {
  onSubmit: (v: any) => void;
  total: number;
}

export default function Form({ onSubmit, total }: FormProps) {
  const { credentials } = useAppSelector((st) => st.user);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        name: credentials.name,
        surname: credentials.surname,
        address: credentials.address,
      }}
      onSubmit={onSubmit}
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
          <>
            <Input
              value={values.name}
              onChangeText={handleChange("name")}
              name={!!errors.name && touched.name ? errors.name : "Name"}
              placeholder="Name"
              style={styles.input}
              onBlur={handleBlur("name")}
              error={!!errors.name && touched.name}
            />

            <Input
              value={values.surname}
              onChangeText={handleChange("surname")}
              name={
                !!errors.surname && touched.surname ? errors.surname : "Surname"
              }
              placeholder="Surname"
              style={styles.input}
              error={!!errors.surname && touched.surname}
              onBlur={handleBlur("surname")}
            />

            <Input
              value={values.address}
              onChangeText={handleChange("address")}
              name={
                !!errors.address && touched.address ? errors.address : "Address"
              }
              placeholder="2780 Quincy Mountain Suite 162"
              style={styles.input}
              error={!!errors.address && touched.address}
              onBlur={handleBlur("address")}
            />

            <CardField
              placeholder={{
                number: "4242 4242 4242 4242",
              }}
              cardStyle={cardFieldStyles}
              style={styles.card}
            />

            <Button
              variant={isValid && dirty ? "primary" : "disabled"}
              disabled={!(isValid && dirty)}
              text={`PAY $${total}`}
              icon={
                <AntDesign
                  name="creditcard"
                  size={24}
                  color="white"
                  style={{ marginRight: 10 }}
                />
              }
              style={[
                styles.button,
                { paddingVertical: 20, borderRadius: 10, marginTop: 15 },
              ]}
              onPress={() => handleSubmit()}
            />
          </>
        );
      }}
    </Formik>
  );
}
