import React from "react";
import { Controller, useController, useFormContext } from "react-hook-form";
import TextField from "../style/TextField";

interface Props {
  name: string;
  placeholder: string;
  required?: boolean;
  rules?: any;
}

const Input = ({ name, placeholder, required = false, rules }: Props) => {
  const { control, clearErrors } = useFormContext();
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required, ...rules },
    defaultValue: "",
  });

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required, ...rules }}
      defaultValue={""}
      render={({ field }) => (
        <TextField
          field={field}
          placeholder={placeholder}
          error={error}
          onFocus={() => clearErrors(name)}
        />
      )}
    />
  );
};

export default Input;
