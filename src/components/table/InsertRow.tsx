import React from "react";
import { useForm } from "react-hook-form";

interface Props {
  columns: { Header: string; accessor: string }[];
  onSubmit: (data: any) => void;
}

const InsertRow = ({ columns, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm();
  return (
    <tr className={`grid grid-cols-${columns.length + 1}`}>
      {columns
        .filter((field) => field.accessor !== "action")
        .map((field) => (
          <input
            {...register(field.accessor, { required: true })}
            className={`bg-third text-center py-4 outline-none text-base ${
              errors[field.accessor] && "border border-error-500"
            }`}
            placeholder={field.Header}
            onFocus={() => clearErrors(field.accessor)}
          />
        ))}
      <div className="bg-third flex justify-center items-center pr-4">
        <button
          type="submit"
          onClick={() => {
            console.log("clicked", onSubmit, handleSubmit);
            handleSubmit(onSubmit, (error) => console.error(error))();
            // reset();
          }}
          className="bg-active text-xl font-bold w-10 rounded-md"
        >
          +
        </button>
      </div>
    </tr>
  );
};

export default InsertRow;
