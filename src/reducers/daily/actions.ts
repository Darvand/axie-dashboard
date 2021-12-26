import { Daily } from "../../types/daily";

export enum DailyAction {
  REQUEST = "REQUEST_DAILY",
  ERROR = "ERROR_DAILY",
  SUCCESS = "SUCCESS_DAILY",
  CREATE_DAILY = "CREATE_DAILY",
}

export interface RequestDailyAction {
  type: DailyAction.REQUEST;
}

export interface SuccessDailyAction {
  type: DailyAction.SUCCESS;
  payload: { daily: Daily[] };
}

export interface CreateAccountAction {
  type: DailyAction.CREATE_DAILY;
  payload: { daily: Daily };
}

export interface ErrorAccountAction {
  type: DailyAction.ERROR;
  payload: { error: unknown };
}

export type DailyActionType =
  | RequestDailyAction
  | SuccessDailyAction
  | CreateAccountAction
  | ErrorAccountAction;
