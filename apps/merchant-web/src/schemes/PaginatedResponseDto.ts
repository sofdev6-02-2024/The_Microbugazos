export interface PaginatedResponseDto<T> {
  items: T[] | null;
  totalCount: number;
  page: number;
  pageSize: number;
}