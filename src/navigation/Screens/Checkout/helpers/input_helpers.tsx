import { Input } from "components";
import { FormikProps } from "formik";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

type FormikSchema = {
  name: string;
  surname: string;
  street: string;
  apartment_number: string;
  phone: string;
  city: string;
};

interface ValidateInputProps {
  name: keyof FormikSchema;
  formik: FormikProps<FormikSchema>;
  style: StyleProp<ViewStyle & TextStyle>;

  /**
   * Text vissible to end user */
  label?: string;

  placeholder?: string;

  parseValue?: (v: string) => string;
}

export function ValidatedInput({
  formik: f,
  name,
  style,
  label,
  placeholder,

  parseValue = (a) => a,
}: ValidateInputProps) {
  const capitalizeLabel = name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <Input
      style={style}
      value={parseValue(f.values[name])}
      onChangeText={f.handleChange(name)}
      name={
        !!f.errors[name] && f.touched[name]
          ? f.errors[name]
          : label ?? capitalizeLabel
      }
      placeholder={placeholder ?? label ?? capitalizeLabel}
      onBlur={f.handleBlur(name)}
      error={!!f.errors[name] && f.touched[name]}
    />
  );
}
