import {createContext, ReactNode, useContext, useEffect, useMemo, useState} from "react";
import axiosInstance from "@/request/AxiosConfig";
import {toast} from "sonner";

interface Type {
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
  const pageSize = 6;
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
    console.log(`/review/ProductReview/${productId}?page=${page + 1}&pageSize=${pageSize}`);
    axiosInstance.get(`/review/ProductReview/${productId}?page=${page + 1}&pageSize=${pageSize}`)
      .then(response => response.data)
      .then(data => {
        setRating(data.data.averageRating);
        setTotalReviews(data.data.reviews.totalItems);
        setReviews(data.data);
        setTimeout(() => setIsLoading(false), 300);
      })
      .catch(e => {
        if (e.response.status != 404) {
          toast.error(e.message);
        }
      })
  }

  const objValue = useMemo(() => ({
    isLoading,
    productId,
    rating,
    totalReviews,
    reviews,
    page,
    setRating,
    refreshReviews,
    setPage,
    setIsLoading
  }), [productId, rating, reviews, totalReviews, isLoading, page]);

  return (
    <ReviewsContext.Provider
      value={objValue}
    >
      {children}
    </ReviewsContext.Provider>
  );
}
