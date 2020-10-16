import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/core";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _size,
  ...props
}) => {
  const [field, { error }] = useField(props);
  const { name } = props;
  return (
    <FormControl isInvalid={Boolean(error)}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input {...field} {...props} id={name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
