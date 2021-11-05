import React, {
  createContext,
  Dispatch,
  FC,
  useEffect,
  useReducer,
  useState,
} from "react";
import { ProductActions, accountReducer } from "./reducer";
import axios from "axios";
import { AccountResponse } from "../types/requests/account";

type State = {
  accounts: AccountResponse[];
};

const initialState = {
  accounts: [],
};

const AppContext = createContext<{ state: State; dispatch: Dispatch<any> }>({
  state: initialState,
  dispatch: () => null,
});

const mainReducer = ({ accounts }: State, action: ProductActions) => ({
  accounts: accountReducer(accounts, action),
});

// const backendURL = "https://axie-dashboard-api.herokuapp.com";
const backendURL = "http://localhost:5000";

const AppProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState<State["accounts"]>([]);

  useEffect(() => {
    axios
      .get<AccountResponse[]>(`${backendURL}/accounts`)
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.log("error", error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <AppContext.Provider value={{ state: { accounts }, dispatch }}>
      {!loading && children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
