import { Input } from "components";
import * as yup from "yup";
import { Formik } from "formik";

const validationSchema = yup.object().shape({
  price: yup.number().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  title: yup.string().required(),
  manufactor: yup.string().required(),
});

const initialValues = {
  price: 0,
  description: "",
  category: "",
  title: "",
  manufactor: "",
};

interface FormProps {
  onSubmit: (data: Object) => Promise<any>;
}

export default function Form({ onSubmit }: FormProps) {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {(f) => (
        <>
          <Input
            name="Title"
            value={f.values.title}
            onChangeText={f.handleChange("title")}
            onBlur={f.handleBlur("title")}
            error={f.touched.title && !!f.errors.title}
            placeholder="Product's title"
          />
          <Input
            name="Description"
            value={f.values.description}
            onChangeText={f.handleChange("description")}
            onBlur={f.handleBlur("description")}
            error={f.touched.description && !!f.errors.description}
            placeholder="Product's description"
          />
        </>
      )}
    </Formik>
  );
}
