import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import DatePicker from "../../../../components/form/controllers/DatePicker";
import Input from "../../../../components/form/controllers/Input";
import { useAccounts } from "../../../../hooks/useAccounts";

const validateRonin = {
  validate: (value: string) => {
    if (!value) return true;
    const roninStart = value.substring(0, 6);
    if (roninStart === "ronin:") return true;
    return value.substring(0, 2) === "0x";
  },
};

const defaultValues = { ronin: "" };

const CreateAccount = () => {
  const methods = useForm({
    shouldFocusError: false,
    defaultValues,
  });
  const { createAccount, isLoading, error } = useAccounts();
  const onSubmit = async (data: typeof defaultValues) => {
    await createAccount(data.ronin);
    methods.reset();
  };
  const onError = (errors: any) => console.log(errors);
  return (
    <FormProvider {...methods}>
      <form
        className="bg-gray-100 rounded p-12 text-blue text-base w-1/2"
        style={{ height: "fit-content" }}
        onSubmit={methods.handleSubmit(onSubmit, onError)}
      >
        <h1 className="text-blue text-lg font-bold">
          Datos cuenta Axie Infinity
        </h1>
        <div className="flex flex-col gap-4 mt-4">
          <Input
            name="ronin"
            placeholder="ronin"
            rules={validateRonin}
            required
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className={`bg-blue text-gray-50 p-2 w-28 rounded flex justify-center ${
              isLoading && "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin" />
            ) : (
              <span>Crear</span>
            )}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default CreateAccount;
