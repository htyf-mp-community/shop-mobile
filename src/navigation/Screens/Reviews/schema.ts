import * as yup from "yup";

export default yup.object().shape({
  title: yup
    .string()
    .min(6, "Must be atleast 6 characters")
    .max(30, "Cannot be longer than 30")
    .required("Title is required"),
  description: yup
    .string()
    .min(6, "Must be atleast 6 characters")
    .required("Description is required"),
});
