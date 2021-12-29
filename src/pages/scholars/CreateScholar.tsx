import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import DatePicker from "../../components/form/controllers/DatePicker";
import Input from "../../components/form/controllers/Input";
import Select from "../../components/form/controllers/Select";
import { useAccountsContext } from "../../context/AccountsContext";
import { useAccounts } from "../../hooks/useAccounts";
import { useScholars } from "../../hooks/useScholars";

const validateRonin = {
  validate: (value: string) => {
    if (!value) return true;
    const roninStart = value.substring(0, 6);
    if (roninStart === "ronin:") return true;
    return value.substring(0, 2) === "0x";
  },
};

const defaultValues = {
  accountRonin: "Ronin de la cuenta",
  scholarRonin: "",
  date: "",
  name: "",
};

const CreateScholar = () => {
  const methods = useForm({
    shouldFocusError: false,
    defaultValues,
  });
  const { createScholar, isLoading, error } = useScholars();
  const { accounts } = useAccountsContext();
  const [load, isLoad] = useState(false);
  const accountsAvailable = accounts
    .filter((account) => !account.scholar)
    .map((account) => ({
      value: account.id,
      text: account.roninAddress,
    }));
  const onSubmit = (data: any) => {
    if (!accountsAvailable.length) {
      return alert("no hay ronin");
    }
    methods.reset();
    isLoad(true);
    setTimeout(() => isLoad(false), 3000);
  };
  const onError = (errors: any) => console.log(errors);
  return (
    <FormProvider {...methods}>
      <form
        className="bg-gray-100 rounded p-12 text-blue text-base w-1/2"
        style={{ height: "fit-content" }}
        onSubmit={methods.handleSubmit(onSubmit, onError)}
      >
        <h1 className="text-blue text-lg font-bold">Cuenta ronin</h1>
        <div className="flex flex-col gap-4 mt-4">
          {accountsAvailable.length ? (
            <Select
              options={accountsAvailable}
              name="accountRonin"
              placeholder="Ronin de la cuenta"
              required
            />
          ) : (
            <p>No hay cuentas disponibles</p>
          )}
        </div>
        <h1 className="text-blue text-lg font-bold mt-4">Datos becado</h1>
        <Input
          name="scholarRonin"
          placeholder="Ronin del becado"
          rules={validateRonin}
        />
        <div className="grid grid-cols-2/3 mt-4 justify-start gap-4">
          <Input name="name" placeholder="nombre becado" required />
          <DatePicker name="date" required />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            className={`bg-blue text-gray-50 p-2 w-28 rounded flex justify-center ${
              load && "bg-gray-500 cursor-not-allowed"
            }`}
            disabled={load}
          >
            {load ? (
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

export default CreateScholar;
