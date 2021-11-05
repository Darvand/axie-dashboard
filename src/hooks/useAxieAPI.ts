import React, { useEffect, useState } from "react";
import axios from "axios";
import { AxieSLPResponse } from "../types/requests/slp";

const axieAPI = "https://game-api.axie.technology";

export const useAxieAPI = (roninAddress: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [slp, setSlp] = useState(0);

  useEffect(() => {
    const fetchSLP = () => {
      axios
        .get<AxieSLPResponse>(`${axieAPI}/slp/${roninAddress}`)
        .then((response) => {
          setSlp(response.data.total);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    };
    fetchSLP();
  }, [roninAddress]);

  return { slp, error, loading };
};
