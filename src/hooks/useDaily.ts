import { useCallback, useContext } from "react";
import { useAccountsContext } from "../context/AccountsContext";
import { ApiContext } from "../context/ApiContext";
import { DailyAction } from "../reducers/daily/actions";
import { useDailyReducer } from "../reducers/daily/useDailyReducer";
import { Daily } from "../types/daily";

export const useDaily = (ronin: string) => {
  const apiHandler = useContext(ApiContext);
  const { accounts } = useAccountsContext();

  const [state, dispatch] = useDailyReducer();

  const fetchDaily = useCallback(async (): Promise<void> => {
    dispatch({ type: DailyAction.REQUEST });
    const response = await apiHandler.request<{}, Daily[]>({
      endpoint: `accounts/${ronin}/daily`,
    });
    if (response.status === 200) {
      dispatch({
        type: DailyAction.SUCCESS,
        payload: {
          daily: response.data,
        },
      });
      return;
    }
    dispatch({
      type: DailyAction.ERROR,
      payload: { error: response },
    });
  }, [apiHandler, dispatch, ronin]);

  const createDaily = useCallback(
    async (daily: Daily) => {
      dispatch({ type: DailyAction.REQUEST });
      const response = await apiHandler.request<Daily, Daily>({
        endpoint: `accounts/${ronin}/daily`,
        data: daily,
        params: { ronin },
        method: "post",
      });

      if (response.status === 201) {
        dispatch({
          type: DailyAction.CREATE_DAILY,
          payload: {
            daily: response.data,
          },
        });
        return;
      }
      dispatch({
        type: DailyAction.ERROR,
        payload: { error: response },
      });
    },
    [apiHandler, dispatch, ronin]
  );

  return {
    ...state,
    createDaily,
    fetchDaily,
  };
};
