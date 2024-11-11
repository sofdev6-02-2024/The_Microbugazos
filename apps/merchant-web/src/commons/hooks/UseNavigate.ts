import { useCallback } from "react";

function useNavigate() {
  return useCallback((url: string) => {
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  }, []);
}

export default useNavigate;
