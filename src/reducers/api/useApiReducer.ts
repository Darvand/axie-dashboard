import { useReducer, Reducer, Dispatch } from "react";

const REQUEST = "REQUEST_";
const SUCCESS = "SUCCESS_";
const ERROR = "ERROR_";

export type Action<A> = {
  type: string;
  payload?: { error?: unknown };
} & A;

export interface ApiReducerState {
  isLoading: boolean;
  error: unknown;
}

export const useApiReducer = <T extends ApiReducerState, A>(
  reducer: Reducer<T, Action<A>>,
  initialState: T
): [T, Dispatch<Action<A>>] => {
  const apiReducer = (state: T, action: Action<A>): T => {
    const newState = reducer(state, action);

    const isRequestActionType = action.type.includes(REQUEST);
    const isSuccessActionType = action.type.includes(SUCCESS);
    const isErrorActionType = action.type.includes(ERROR);

    if (isRequestActionType) {
      return {
        ...newState,
        isLoading: true,
      };
    } else if (isSuccessActionType) {
      return {
        ...newState,
        isLoading: false,
      };
    } else if (isErrorActionType) {
      return {
        ...newState,
        isLoading: false,
        error: action.payload?.error,
      };
    }
    return newState;
  };

  return useReducer(apiReducer, initialState);
};
