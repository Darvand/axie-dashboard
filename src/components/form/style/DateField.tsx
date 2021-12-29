import React from "react";
import { RefCallBack } from "react-hook-form";

interface Props {
  name: string;
  value: string;
  inputRef: RefCallBack;
  onFocus: () => void;
  onChange: any;
  error: any;
}

const DateField = ({
  name,
  value,
  inputRef,
  onFocus,
  onChange,
  error,
}: Props) => {
  return (
    <input
      type="date"
      className={`p-3 ${error && "border border-error-500"}`}
      onFocus={onFocus}
      onChange={onChange}
      name={name}
      value={value}
      ref={inputRef}
    />
  );
};

export default DateField;
