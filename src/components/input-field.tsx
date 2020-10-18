import React, { InputHTMLAttributes } from "react";
import { useField } from "formik";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/core";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size: _size,
  textarea,
  ...props
}) => {
  const [field, { error }] = useField(props);
  const { name } = props;
  const InputOrTextarea = textarea ? Textarea : Input;

  return (
    <FormControl isInvalid={Boolean(error)}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputOrTextarea {...field} {...props} id={name} />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
