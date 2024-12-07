import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AxiosInstance } from "axios";

import axiosInstance from "@/request/AxiosConfig";

type ErrorType = Error | null;
type Data<T> = T | null;

interface Params<T> {
  data: Data<T>;
  loading: boolean;
  error: ErrorType;
  setData: Dispatch<SetStateAction<Data<T>>>;
}

interface FetchConfig {
  signal?: AbortSignal;
}

export function useFetch<T>(
  url: string,
  initialData: Data<T>,
  customAxios: AxiosInstance = axiosInstance
): Params<T> {
  const [data, setData] = useState<Data<T>>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    const fetchData = async () => {
      try {
        if (url === "") return;

        const config: FetchConfig = {
          signal: controller.signal,
        };

        const response = await customAxios.get(url, config);
        if (url.startsWith("/inventory")) {
          setData(response.data.data);
        }else{
          setData(response.data.data);
        }

      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, [url, customAxios]);

  return { data, error, loading, setData };
}
