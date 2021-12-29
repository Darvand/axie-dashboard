import { Scholar } from "../../types/scholar";

export enum ScholarsAction {
  REQUEST = "REQUEST_SCHOLAR",
  ERROR = "ERROR_SCHOLAR",
  SUCCESS = "SUCCESS_SCHOLAR",
  CREATE_SCHOLAR = "CREATE_SCHOLAR",
}

export interface RequestScholarsAction {
  type: ScholarsAction.REQUEST;
}

export interface SuccessScholarsAction {
  type: ScholarsAction.SUCCESS;
  payload: { scholars: Scholar[] };
}

export interface CreateScholarsAction {
  type: ScholarsAction.CREATE_SCHOLAR;
  payload: { scholar: Scholar };
}

export interface ErrorScholarsAction {
  type: ScholarsAction.ERROR;
  payload: { error: unknown };
}

export type ScholarsActionType =
  | RequestScholarsAction
  | SuccessScholarsAction
  | CreateScholarsAction
  | ErrorScholarsAction;
