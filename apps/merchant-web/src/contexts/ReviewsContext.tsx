import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import axiosInstance from "@/request/AxiosConfig";
import {toast} from "sonner";
import {useAuth} from "@/commons/context/AuthContext";

interface Type {
  isAbleToAdd: boolean;
  isLoading: boolean;
  productId: string;
  rating: number;
  totalReviews: number;
  reviews: Reviews | undefined;
  page: number,
  setRating: (number) => void;
  refreshReviews: () => void;
  setPage: (number) => void;
  setIsLoading: (boolean) => void;
  setIsAbleToAdd:(boolean) => void;
}

interface ReviewsProviderProps {
  children: ReactNode;
  productId: string;
}

export const ReviewsContext = createContext<Type | undefined>(undefined);

export const useReviewsContext = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error(
      "useFiltersContext must be used within a FiltersProvider"
    );
  }
  return context;
};

export const ReviewsProvider = ({children, productId}: ReviewsProviderProps) => {
  const authContext = useAuth();
  const pageSize = 6;
  const [isAbleToAdd, setIsAbleToAdd] = useState(true);
  const [page, setPage] = useState(0);
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState<Reviews | undefined>(undefined);
  const [totalReviews, setTotalReviews] = useState(0);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    loadReviews();
  }, [refresh, page]);

  const refreshReviews = () => {
    setRefresh(!refresh);
  }

  const loadReviews = () => {
    axiosInstance.get(`/review/ProductReview/${productId}?page=${page + 1}&pageSize=${pageSize}&clientId=${authContext.user?.userId ?? ""}`)
      .then(response => response.data)
      .then(data => {
        setRating(data.data.averageRating);
        setTotalReviews(data.data.reviews.totalItems);
        setReviews(data.data);
        setIsAbleToAdd(data.data.clientAbleToAdd);
        setTimeout(() => setIsLoading(false), 300);
      })
      .catch(e => {
        if (e.response.status != 404) {
          toast.error(e.message);
        }
      })
  }

  const objValue = useMemo(() => ({
    isAbleToAdd,
    isLoading,
    productId,
    rating,
    totalReviews,
    reviews,
    page,
    setRating,
    refreshReviews,
    setPage,
    setIsLoading,
    setIsAbleToAdd
  }), [productId, rating, reviews, totalReviews, isLoading, page, isAbleToAdd]);

  return (
    <ReviewsContext.Provider
      value={objValue}
    >
      {children}
    </ReviewsContext.Provider>
  );
}
