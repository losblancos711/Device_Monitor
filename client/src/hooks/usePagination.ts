import { useMemo } from "react";

export interface PaginationProps {
  totalCount: number;
  pageSize: number;
  currentPage: number;
}

export const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  totalCount,
  pageSize,
  currentPage,
}: PaginationProps) => {
  const paginationRange = useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);
    return range(1, totalPageCount);
  }, [totalCount, pageSize, currentPage]);

  return paginationRange;
};
