import axios, { AxiosRequestConfig } from "axios";
import { QueryClient } from "react-query";

const instance = axios.create();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: false,
      cacheTime: Infinity,
    },
  },
});

async function fetcher<T>(url: string, config: AxiosRequestConfig = {}) {
  try {
    const response = await instance({
      url,
      withCredentials: true,
      ...config,
    });
    return response.data;
  } catch (error: any) {
    throw Error(error);
  }
}

export { queryClient, fetcher, instance };