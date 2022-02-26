import * as yup from "yup";

const checkoutSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(/^[a-z]+$/)
    .required("Name is required"),
  surname: yup
    .string()
    .trim()
    .matches(/^[a-z]+$/)
    .required("Surname is required"),
  address: yup.string().required("Address is required"),
});

export default checkoutSchema;
