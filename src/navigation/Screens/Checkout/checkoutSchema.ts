import * as yup from "yup";

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  surname: yup.string().required("Surname is required"),
  address: yup.string().required("Address is required"),
});

export default checkoutSchema;
