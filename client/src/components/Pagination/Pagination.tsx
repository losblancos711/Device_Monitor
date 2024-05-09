import React, { useState } from "react";
import { usePagination, PaginationProps } from "../../hooks/usePagination";
import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import styles from "./Pagination.module.css";
import { useStore } from "../../store/store";

interface PaginationCompProps extends PaginationProps {
  onPageChange: (currentPage: number) => void;
}

export const Pagination = ({
  onPageChange,
  totalCount,
  currentPage,
  pageSize,
}: PaginationCompProps) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    pageSize,
  });

  const { currentPageSize, setCurrentPageSize } = useStore();

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  const handlePageSizeChange = (e: SelectChangeEvent) => {
    onPageChange(1);
    setCurrentPageSize(+e.target.value);
  };

  return (
    <div className={styles.flexBox}>
      <div className={styles.show}>Show</div>
      <FormControl fullWidth>
        <Select
          className={styles.pageSizeSelect}
          value={currentPageSize.toString()}
          displayEmpty
          onChange={handlePageSizeChange}
          IconComponent={KeyboardArrowDown}
        >
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={totalCount}>All</MenuItem>
        </Select>
      </FormControl>

      <div>
        <ul className={styles.paginationList}>
          <li>
            <IconButton onClick={onPrevious} disabled={currentPage === 1}>
              <KeyboardArrowLeft />
            </IconButton>
          </li>
          {paginationRange.map((pageNumber: number, i) => {
            return (
              <li key={`${pageNumber}-${i}`}>
                <IconButton
                  className={`${
                    pageNumber === currentPage ? styles.active : ""
                  }`}
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </IconButton>
              </li>
            );
          })}
          <li>
            <IconButton onClick={onNext} disabled={currentPage === lastPage}>
              <KeyboardArrowRight />
            </IconButton>
          </li>
        </ul>
      </div>
    </div>
  );
};
