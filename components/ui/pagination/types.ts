type PaginationProps = {
  page: number;
  totalItems: number;
  limit: number;
  changePage: (page: number) => void;
};
