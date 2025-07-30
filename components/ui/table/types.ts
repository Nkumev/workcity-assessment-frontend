type AppTableHeaderProps = {
  title: string;
  key: string;
  sortable?: boolean;
  body?: (args: any) => React.ReactNode;
  node?: React.ReactNode;
};

type AppTableProps<T> = {
  data: T[];
  headings: AppTableHeaderProps[];
  loading?: boolean;
  pageOptions: PaginationProps;
  rowClick?: (args: T) => void;
};

type TableSortProps = {
  sorted?: boolean;
  sortOrder?: 1 | 0 | -1 | null | undefined;
};
