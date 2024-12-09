import axios from 'axios';
import { OrderWithCompleteDetailsDto } from "@/schemes/order/OrderWithCompleteDetailsDto";
import { PaginatedResponseDto } from "@/schemes/PaginatedResponseDto";
import { Filter } from "@/hooks/useOrderFilter";
import {handleAxiosError} from "@/request/AxiosErrorHandler";
import { API_URL } from '@/request/AxiosConfig';

const baseUrl: string = `${API_URL}/payment/Order`;

export const getOrdersByUser = async (
  userId: string,
  filter: Filter
): Promise<PaginatedResponseDto<OrderWithCompleteDetailsDto>> => {
  try {
    const response = await axios.get (
      `${baseUrl}/${userId}/User`,
      {
        params: {
          startDate: filter.getStartDate() || undefined,
          endDate: filter.getEndDate() || undefined,
          minPrice: filter.getMinPrice() || undefined,
          maxPrice: filter.getMaxPrice() || undefined,
          status: filter.getOrderStatus() || undefined,
          page: filter.getPage() || 1,
          pageSize: filter.getPageSize() || 10
        }
      }
    );
    return response.data.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
}
