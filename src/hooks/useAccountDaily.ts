import React, { useEffect, useState } from "react";
import axios from "axios";
import { DailyResponse } from "../types/requests/daily";

// const backendURL = "https://axie-dashboard-api.herokuapp.com";
const backendURL = "http://localhost:5000";

export const useAccountDaily = (roninAddress: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [daily, setDaily] = useState<DailyResponse[]>([]);

  useEffect(() => {
    const fetchSLP = () => {
      axios
        .get<DailyResponse[]>(`${backendURL}/accounts/${roninAddress}`)
        .then((response) => {
          setDaily(response.data);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    };
    fetchSLP();
  }, [roninAddress]);

  return { daily, error, loading };
};
