import { Injectable } from '@nestjs/common';
import { PAGINATION_DEFAULT_LIMIT } from 'src/constants';
import { IPagination, IPaginationResponse } from 'src/types/pagination.type';

@Injectable()
export class PaginationUtility {
  calculateOffset(pagination: IPagination): number {
    const page = pagination.page || 1;
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;
    return (page - 1) * limit;
  }

  paginationResponse(
    pagination: IPagination,
    items: any[],
    totalItems: number,
  ): IPaginationResponse<any> {
    const page = pagination.page || 1;
    const limit = pagination.limit || PAGINATION_DEFAULT_LIMIT;
    const totalPage = totalItems ? Math.ceil(totalItems / limit) : 1;
    return {
      items,
      paginationData: {
        currentPage: page,
        totalPage,
        limit,
        totalItems,
      },
    };
  }
}
