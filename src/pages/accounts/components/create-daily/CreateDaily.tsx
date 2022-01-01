import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import Input from "../../../../components/form/Input";
import { useAccountsContext } from "../../../../context/AccountsContext";

interface Props {}

const defaultValues = {};

const CreateDaily = (props: Props) => {
  const { ronin } = useParams<{ ronin: string }>();
  const { accounts } = useAccountsContext();
  const history = useHistory();
  const [account] = accounts.filter((acc) => acc.roninAddress === ronin);
  const methods = useForm({
    shouldFocusError: false,
    defaultValues,
  });
  const onSubmit = async (data: typeof defaultValues) => {};
  const onError = (errors: any) => console.log(errors);
  return (
    <div className="w-3/4 flex justify-center items-center">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit, onError)}
          className="w-full flex flex-col justify-center bg-secondary p-8 rounded
            border-b-4 border-solid border-active
            border-t-4
            items-center
          "
        >
          <h1 className="text-2xl text-primary-text font-montserrat text-center">
            Crear registro diario
          </h1>
          <section className="w-9/12">
            <Input name="date" label="Dia" type="date" required />
            <Input name="daySLP" label="SLP" type="number" required />
            <Input
              name="inGameSLP"
              label="En el juego"
              type="number"
              required
            />
            <Input name="dayMMR" label="Copas/Dia" type="number" required />
            <Input name="mmr" label="MMR" type="number" required />
          </section>
          <div className="w-full flex justify-end items-center mt-8 gap-10">
            <button
              className="border border-active text-active text-sm px-3 w-36 rounded h-8"
              onClick={() => history.goBack()}
            >
              Cancelar
            </button>
            <button className="bg-active text-primary text-sm px-3 w-36 rounded h-8 font-bold">
              Crear
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CreateDaily;
