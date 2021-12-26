import React, {
  createContext,
  Dispatch,
  FC,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  ProductActions,
  accountReducer,
  SLPPriceActions,
  slpPriceReducer,
} from "./reducer";
import axios from "axios";
import { Account } from "../types/account";

type State = {
  accounts: Account[];
  slpPrice: number;
};

const initialState = {
  accounts: [],
  slpPrice: 0,
};

const AppContext = createContext<{
  state: State;
  dispatch: Dispatch<ProductActions | SLPPriceActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = (
  { accounts, slpPrice }: State,
  action: ProductActions | SLPPriceActions
) => ({
  accounts: accountReducer(accounts, action),
  slpPrice: slpPriceReducer(slpPrice, action),
});

const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
