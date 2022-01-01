import { createContext, ReactElement, useEffect } from "react";
import { useDaily } from "../hooks/useDaily";
import { initialState } from "../reducers/daily/useDailyReducer";

interface ApiProviderProps {
  ronin: string;
  children: ReactElement;
}

export const DailyContext = createContext(initialState);

export const DailyProvider = (props: ApiProviderProps) => {
  const { ronin, children } = props;
  const { fetchDaily, isLoading, ...results } = useDaily(ronin);
  useEffect(() => {
    fetchDaily();
  }, [fetchDaily, ronin]);
  if (isLoading) <div>cuentas cargando</div>;
  return (
    <DailyContext.Provider value={{ isLoading, ...results }}>
      {children}
    </DailyContext.Provider>
  );
};
