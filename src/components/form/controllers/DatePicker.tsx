import { DateTime } from "luxon";
import React from "react";
import { useController, useFormContext } from "react-hook-form";
import DateField from "../style/DateField";

interface Props {
  name: string;
  required?: boolean;
}

const DatePicker = ({ name, required = false }: Props) => {
  const { control, clearErrors } = useFormContext();
  const {
    field: { onChange, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required,
      validate: (date: string) => {
        const today = DateTime.now();
        const picked = DateTime.fromISO(date);
        return picked < today;
      },
    },
  });

  return (
    <DateField
      error={error}
      onFocus={() => clearErrors(name)}
      onChange={onChange}
      value={value}
      name={name}
      inputRef={ref}
    />
  );
};

export default DatePicker;
