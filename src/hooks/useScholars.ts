import { useCallback, useContext } from "react";
import { ApiContext } from "../context/ApiContext";
import { ScholarsAction } from "../reducers/scholars/actions";
import { useScholarReducer } from "../reducers/scholars/useScholarsReducer";
import { Scholar } from "../types/scholar";

export const useScholars = () => {
  const apiHandler = useContext(ApiContext);

  const [state, dispatch] = useScholarReducer();

  const fetchScholars = useCallback(async (): Promise<void> => {
    dispatch({ type: ScholarsAction.REQUEST });
    const response = await apiHandler.request<{}, Scholar[]>({
      endpoint: `scholars`,
    });
    if (response.status === 200) {
      dispatch({
        type: ScholarsAction.SUCCESS,
        payload: {
          scholars: response.data,
        },
      });
      return;
    }
    dispatch({
      type: ScholarsAction.ERROR,
      payload: { error: response },
    });
  }, [apiHandler, dispatch]);

  const createScholar = useCallback(
    async (scholar: any) => {
      dispatch({ type: ScholarsAction.REQUEST });
      const response = await apiHandler.request<any, Scholar>({
        endpoint: `scholar`,
        data: scholar,
      });

      if (response.status === 201) {
        dispatch({
          type: ScholarsAction.CREATE_SCHOLAR,
          payload: {
            scholar: response.data,
          },
        });
        return;
      }
      dispatch({
        type: ScholarsAction.ERROR,
        payload: { error: response },
      });
    },
    [apiHandler, dispatch]
  );

  return {
    ...state,
    createScholar,
    fetchScholars,
  };
};
