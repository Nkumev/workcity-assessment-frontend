type IUser = {
  id: string;
  username: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
  createdAt: string;
  updatedAt: string;
};
