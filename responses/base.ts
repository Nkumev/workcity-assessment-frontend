type StandardResponse<T> = {
  message: string;
  data: T;
};

type StandardErrorResponse = {
  message: string;
  error: string;
};

type ListResponse<T> = {
  message: string;
  page: number;
  limit: number;
  total: number;
  data: T[];
};
