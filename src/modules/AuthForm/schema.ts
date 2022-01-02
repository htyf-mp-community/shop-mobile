import * as yup from "yup";

export default yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, ({ min }) => `Must be at least ${min} characters`)
    .required("Password is required"),
});
