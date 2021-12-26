import React, { createContext, ReactElement, useMemo } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

enum ApiBase {
  ACCOUNTS = "accounts",
}

interface RequestConfig {
  apiBase?: ApiBase | string;
  endpoint?: string;
  url?: string;
  method?: "get" | "post" | "put" | "delete";
  params?: { [x: string]: string | number };
  idToken?: string;
  data?: any;
  headers?: {
    [x: string]: string;
  };
}

interface ApiProviderProps {
  idToken?: string;
  apiBase: string;
  children: ReactElement;
}

type ApiHandler = {
  request: <T, Q>(request: RequestConfig) => Promise<AxiosResponse<Q>>;
};

const buildAxiosConfig = (
  baseConfig: RequestConfig,
  requestConfig: RequestConfig
): AxiosRequestConfig => {
  return {
    url: `${baseConfig.apiBase}/${requestConfig.endpoint}`,
    headers: {
      ...requestConfig.headers,
      Authorization: `Bearer ${baseConfig.idToken}`,
    },
    ...requestConfig,
  };
};

export const apiHandler = (config: RequestConfig): ApiHandler => {
  return {
    request: async function <T = {}, Q = {}>(
      requestConfig: RequestConfig
    ): Promise<AxiosResponse<Q>> {
      try {
        const axiosConfig = buildAxiosConfig(config, requestConfig);
        const response = await axios.request<T, AxiosResponse<Q>>(axiosConfig);
        return response;
      } catch (error) {
        console.error(error);
        throw new Error(`Error on API request`);
      }
    },
  };
};

export const ApiContext = createContext<ApiHandler>(apiHandler({}));

export const ApiProvider = (props: ApiProviderProps) => {
  const { idToken, apiBase, children } = props;
  const authApiHandler: ApiHandler = useMemo(
    () => apiHandler({ idToken, apiBase }),
    [idToken, apiBase]
  );
  return (
    <ApiContext.Provider value={authApiHandler}>{children}</ApiContext.Provider>
  );
};
