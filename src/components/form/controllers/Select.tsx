import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  options: { value: string; text: string }[];
  name: string;
  placeholder: string;
  required?: boolean;
}

const Select = ({ options, name, placeholder, required = false }: Props) => {
  const { control, clearErrors } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required }}
      render={({ field }) => (
        <select
          {...field}
          onFocus={() => clearErrors(name)}
          className="appearance-none
            focus-within:outline-none
            mt-2
            w-full 
            p-3
            text-base text-blue 
          bg-white
            rounded 
            border border-solid border-white focus:border-blue"
        >
          <option selected disabled hidden>
            {placeholder}
          </option>
          {options.map(({ value, text }) => (
            <option key={value} value={value}>
              {text}
            </option>
          ))}
        </select>
      )}
    />
  );
};

export default Select;
