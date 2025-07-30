type ClientListResponse = {
  message: string;
  page: number;
  limit: number;
  total: number;
  data: IClient[];
};
