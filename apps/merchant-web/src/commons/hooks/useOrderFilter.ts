import { Dispatch, SetStateAction, useState } from "react";
import { OrderStatus } from "@/types/orderStatus";

export class Filter {
  private selectedStartDate: string | null;
  private selectedEndDate: string | null;
  private minPrice: number | null;
  private maxPrice: number | null;
  private orderStatus: OrderStatus | null;
  private page: number | null;
  private pageSize: number | null;

  private readonly setSelectedStartDate: Dispatch<SetStateAction<string | null>>;
  private readonly setSelectedEndDate: Dispatch<SetStateAction<string | null>>;
  private readonly setMinPrice: Dispatch<SetStateAction<number | null>>;
  private readonly setMaxPrice: Dispatch<SetStateAction<number | null>>;
  private readonly setOrderStatus: Dispatch<SetStateAction<OrderStatus | null>>;
  private readonly setPage: Dispatch<SetStateAction<number | null>>;
  private readonly setPageSize: Dispatch<SetStateAction<number | null>>;

  constructor(
    selectedStartDate: string | null,
    selectedEndDate: string | null,
    minPrice: number | null,
    maxPrice: number | null,
    orderStatus: OrderStatus | null,
    page: number | null,
    pageSize: number | null,
    setSelectedStartDate: Dispatch<SetStateAction<string | null>>,
    setSelectedEndDate: Dispatch<SetStateAction<string | null>>,
    setMinPrice: Dispatch<SetStateAction<number | null>>,
    setMaxPrice: Dispatch<SetStateAction<number | null>>,
    setOrderStatus: Dispatch<SetStateAction<OrderStatus | null>>,
    setPage: Dispatch<SetStateAction<number | null>>,
    setPageSize: Dispatch<SetStateAction<number | null>>
  ) {
    this.selectedStartDate = selectedStartDate;
    this.selectedEndDate = selectedEndDate;
    this.minPrice = minPrice;
    this.maxPrice = maxPrice;
    this.orderStatus = orderStatus;
    this.page = page;
    this.pageSize = pageSize;

    this.setSelectedStartDate = setSelectedStartDate;
    this.setSelectedEndDate = setSelectedEndDate;
    this.setMinPrice = setMinPrice;
    this.setMaxPrice = setMaxPrice;
    this.setOrderStatus = setOrderStatus;
    this.setPage = setPage;
    this.setPageSize = setPageSize;
  }

  updateStartDate(newStartDate: string | null) {
    this.setSelectedStartDate(newStartDate);
  }

  updateEndDate(newEndDate: string | null) {
    this.setSelectedEndDate(newEndDate);
  }

  updateMinPrice(newMinPrice: number | null) {
    this.setMinPrice(newMinPrice);
  }

  updateMaxPrice(newMaxPrice: number | null) {
    this.setMaxPrice(newMaxPrice);
  }

  updateOrderStatus(newOrderStatus: OrderStatus | null) {
    this.setOrderStatus(newOrderStatus);
  }

  updatePage(newPage: number | null) {
    this.setPage(newPage);
  }

  updatePageSize(newPageSize: number | null) {
    this.setPageSize(newPageSize);
  }

  getStartDate() {
    return this.selectedStartDate;
  }

  getEndDate() {
    return this.selectedEndDate;
  }

  getMinPrice() {
    return this.minPrice;
  }

  getMaxPrice() {
    return this.maxPrice;
  }

  getOrderStatus() {
    return this.orderStatus;
  }

  getPage() {
    return this.page ?? undefined;
  }

  getPageSize() {
    return this.pageSize ?? undefined;
  }
}

export const useFilter = () => {
  const [selectedStartDate, setSelectedStartDate] = useState<string | null>(null);
  const [selectedEndDate, setSelectedEndDate] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);
  const [page, setPage] = useState<number | null>(null);
  const [pageSize, setPageSize] = useState<number | null>(null);

  return new Filter(
    selectedStartDate,
    selectedEndDate,
    minPrice,
    maxPrice,
    orderStatus,
    page,
    pageSize,
    setSelectedStartDate,
    setSelectedEndDate,
    setMinPrice,
    setMaxPrice,
    setOrderStatus,
    setPage,
    setPageSize
  );
};
