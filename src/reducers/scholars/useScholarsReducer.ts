import { Dispatch } from "react";
import { Scholar } from "../../types/scholar";
import { useApiReducer } from "../api/useApiReducer";
import { ScholarsActionType, ScholarsAction } from "./actions";

export interface ScholarState {
  error: unknown;
  isLoading: boolean;
  scholars: Scholar[];
}

export const initialState: ScholarState = {
  error: null,
  isLoading: false,
  scholars: [],
};

export const reducer = (
  state: ScholarState,
  action: ScholarsActionType
): ScholarState => {
  console.log("scholar", action.type);
  switch (action.type) {
    case ScholarsAction.REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case ScholarsAction.SUCCESS: {
      const { scholars } = action.payload;
      return {
        ...state,
        scholars,
        isLoading: false,
      };
    }
    case ScholarsAction.CREATE_SCHOLAR: {
      const { scholar } = action.payload;
      return {
        ...state,
        isLoading: false,
        scholars: [...state.scholars, scholar],
      };
    }
    case ScholarsAction.ERROR: {
      const { error } = action.payload;
      return {
        ...state,
        error,
        isLoading: false,
      };
    }
    default:
      return state;
  }
};

export const useScholarReducer = (): [
  ScholarState,
  Dispatch<ScholarsActionType>
] => {
  return useApiReducer(reducer, initialState);
};
