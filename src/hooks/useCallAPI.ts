import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";

const backendURL = "http://localhost:5000";

interface FetchData {
  url: string;
  headers?: any;
  method?: "get" | "post" | "put";
}

interface Response<T> {
  data: null | T;
  error: null | any;
  isLoading: boolean;
}

export const useCallAPI = <T = {}>({
  url,
  headers,
  method = "get",
}: FetchData) => {
  const [res, setRes] = useState<Response<T>>({
    data: null,
    error: null,
    isLoading: false,
  });
  // You POST method here
  const callAPI = useCallback(
    (payload?: any) => {
      setRes((prevState) => ({ ...prevState, isLoading: true }));
      console.log("payload", payload);
      axios[method](`${backendURL}/${url}`, payload, { headers })
        .then((res) => {
          setRes({ data: res.data as any, isLoading: false, error: null });
        })
        .catch((error) => {
          setRes({ data: null, isLoading: false, error });
        });
    },
    [method, url, headers]
  );
  return { res, callAPI };
};
