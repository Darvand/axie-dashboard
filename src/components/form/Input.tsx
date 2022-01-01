import React from "react";
import { Controller, useFormContext } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  type?: "text" | "number" | "date";
  required?: boolean;
  rules?: any;
}

const Input = ({
  name,
  label,
  rules,
  required = false,
  type = "text",
}: Props) => {
  const {
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required, ...rules }}
      render={({ field }) => (
        <div className="grid grid-cols-4 gap-12 w-full justify-end items-center mt-8">
          <label
            htmlFor={name}
            className="text-primary-text text-sm text-left col-span-1"
          >
            {label}
          </label>
          <input
            {...field}
            type={type}
            onFocus={() => clearErrors(name)}
            className={`py-2 px-4 bg-third text-primary text-sm cursor-text outline-none
              rounded
              border border-solid border-third
              focus:border-primary-text
              col-span-3
              ${errors[name] && "border border-error-500"}`}
          />
        </div>
      )}
    />
  );
};

export default Input;
