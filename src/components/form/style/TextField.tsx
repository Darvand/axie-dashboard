import React from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

interface Props {
  onFocus: () => void;
  error: any;
  placeholder: string;
  field: ControllerRenderProps<FieldValues, string>;
}

const TextField = ({ onFocus, error, placeholder, field }: Props) => {
  return (
    <input
      {...field}
      placeholder={placeholder}
      className={`p-3 w-full ${error && "border border-error-500"}`}
      onFocus={onFocus}
    />
  );
};

export default TextField;
