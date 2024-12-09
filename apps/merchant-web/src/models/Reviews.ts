
interface Reviews {
  productId: string;
  averageRating: number;
  reviews: {
    items: Array<Review>
    totalCount: number;
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  }
}

interface Review {
  clientName: string;
  rating: number;
  comment: string;
  createdAt: string;
}
