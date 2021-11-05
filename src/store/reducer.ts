import { AccountResponse } from "../types/requests/account";

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
  Update = "UPDATE_ACCOUNTS",
}

type AccountPayload = {
  [Types.Update]: AccountResponse[];
};

export type ProductActions =
  ActionMap<AccountPayload>[keyof ActionMap<AccountPayload>];

export const accountReducer = (
  state: AccountResponse[],
  action: ProductActions
) => {
  switch (action.type) {
    case "UPDATE_ACCOUNTS":
      return {
        ...state,
        accounts: action.payload,
      };
    default:
      return state;
  }
};
