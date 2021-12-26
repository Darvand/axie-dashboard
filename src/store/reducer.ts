import { Account } from "../types/account";

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export enum Types {
  UpdateAccounts = "UPDATE_ACCOUNTS",
  UpdateSLPPrice = "UPDATE_SLP_PRICE",
  AddAccount = "ADD_ACCOUNT",
}

type AccountPayload = {
  [Types.UpdateAccounts]: Account[];
  [Types.AddAccount]: Account;
};

export type ProductActions =
  ActionMap<AccountPayload>[keyof ActionMap<AccountPayload>];

export const accountReducer = (
  state: Account[],
  action: ProductActions | SLPPriceActions
) => {
  switch (action.type) {
    case "UPDATE_ACCOUNTS":
      return {
        ...state,
        accounts: action.payload,
      };
    case Types.AddAccount:
      return [...state, action.payload];
    default:
      return state;
  }
};

type SLPPricePayload = {
  [Types.UpdateSLPPrice]: number;
};

export type SLPPriceActions =
  ActionMap<SLPPricePayload>[keyof ActionMap<SLPPricePayload>];

export const slpPriceReducer = (
  state: number,
  action: ProductActions | SLPPriceActions
) => {
  switch (action.type) {
    case Types.UpdateSLPPrice:
      return state;
    default:
      return state;
  }
};
