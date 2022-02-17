import * as React from "react";

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

import { SWRConfig } from "swr";

export function createFetcher(instance: AxiosInstance) {
  return async function fetcher(url: string, config: AxiosRequestConfig = {}) {
    try {
      const response = await instance({
        url,
        ...config,
      });
      return response.data;
    } catch (error) {
      throw Error(error);
    }
  };
}

const baseConfig = {
  provider: () => new Map(),
};

export function BlocksEditorProvider({
  children,
  api,
}: {
  children: React.ReactNode;
  api: string;
}) {
  const config = React.useMemo(() => {
    if (api) {
      const instance = axios.create({
        baseURL: api,
      });
      return {
        ...baseConfig,
        fetcher: createFetcher(instance),
      };
    }

    return null;
  }, [api]);

  if (!config) return null;

  return <SWRConfig value={config}>{children}</SWRConfig>;
}
