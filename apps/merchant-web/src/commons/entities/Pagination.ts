export class Pagination<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;

  constructor(
    content: T[],
    totalCount: number,
    page: number,
    pageSize: number,
    totalItems: number,
    totalPages: number
  ) {
    this.items = content;
    this.totalCount = totalCount;
    this.page = page;
    this.pageSize = pageSize;
    this.totalItems = totalItems;
    this.totalPages = totalPages;
  }
}

export const emptyPagination = new Pagination([], 0, 0, 0, 0, 0);
