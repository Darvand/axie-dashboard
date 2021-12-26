import { DateTime } from "luxon";
import { Dispatch } from "react";
import { Daily } from "../../types/daily";
import { useApiReducer } from "../api/useApiReducer";
import { DailyAction, DailyActionType } from "./actions";

export interface DailyState {
  error: unknown;
  isLoading: boolean;
  daily: Daily[];
}

export const initialState: DailyState = {
  error: null,
  isLoading: true,
  daily: [],
};

export const reducer = (
  state: DailyState,
  action: DailyActionType
): DailyState => {
  switch (action.type) {
    case DailyAction.SUCCESS: {
      const { daily } = action.payload;
      return {
        ...state,
        daily,
      };
    }
    case DailyAction.CREATE_DAILY: {
      const { daily } = action.payload;
      const newDaily = [...state.daily, daily];
      return {
        ...state,
        daily: newDaily.sort((prev, next) => {
          const nextOnMillis = DateTime.fromISO(
            next.date.toString()
          ).toMillis();
          const prevOnMillis = DateTime.fromISO(
            prev.date.toString()
          ).toMillis();
          return nextOnMillis - prevOnMillis;
        }),
      };
    }
    default:
      return state;
  }
};

export const useDailyReducer = (): [DailyState, Dispatch<DailyActionType>] => {
  return useApiReducer(reducer, initialState);
};
