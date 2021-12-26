import axios from "axios";
import { useContext } from "react";
import { AppContext } from "../store/context";
import { AccountResponse } from "../types/requests/account";

// const backendURL = "https://axie-dashboard-api.herokuapp.com";
const backendURL = "http://localhost:5000";

export const createAccount = async (address: string) => {
  try {
    const response = await axios.post<AccountResponse>(
      `${backendURL}/accounts/${address}`
    );
    return [null, response.data];
  } catch (error) {
    return [error, null];
  }
};
