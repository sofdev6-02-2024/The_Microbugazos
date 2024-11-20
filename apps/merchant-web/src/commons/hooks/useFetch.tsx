import axiosInstance from "@/request/AxiosConfig";
import { useEffect, useState } from "react";

type ErrorType = Error | null;
type Data<T> = T | null;

interface Params<T> {
  data: Data<T>;
  loading: boolean;
  error: ErrorType;
  setData: (data: Data<T>) => void;
}

export function useFetch<T>(url: string, initialData: Data<T>): Params<T> {
  const [data, setData] = useState<Data<T>>(initialData);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType>(null);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    const fetchData = async () => {
      try {
        console.log("RELOADING")
        if (url === "") return;
        const response = await axiosInstance.get(url, controller);
        setData(response.data);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      controller.abort();
    };
  }, [url]);

  return { data, error, loading, setData };
}
