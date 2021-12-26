import { useEffect, useState } from "react";
import axios from "axios";
import { Scholar } from "../pages/scholars/scholars.interface";

// const backendURL = "https://axie-dashboard-api.herokuapp.com";
const backendURL = "http://localhost:5000";

export const useScholarsAPI = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [scholars, setScholars] = useState<Scholar[]>([]);

  useEffect(() => {
    const fetch = () => {
      axios
        .get<Scholar[]>(`${backendURL}/scholars`)
        .then((response) => {
          setScholars(response.data);
        })
        .catch((error) => setError(error))
        .finally(() => setLoading(false));
    };
    fetch();
  }, []);

  return { scholars, error, loading };
};
