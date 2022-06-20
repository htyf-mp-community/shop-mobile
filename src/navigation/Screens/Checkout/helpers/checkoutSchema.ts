import * as yup from "yup";

const checkoutSchema = yup.object().shape({
  name: yup.string().trim().required("Name is required"),
  surname: yup.string().trim().required("Surname is required"),
  street: yup.string().required("Address is required"),
  apartment_number: yup.string().required(""),
  city: yup.string().required(""),
  phone: yup.string().required("Phone is required"),
});

export default checkoutSchema;
