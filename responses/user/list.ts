type UserListResponse = {
  message: string;
  page: number;
  limit: number;
  total: number;
  data: IUser[];
};
