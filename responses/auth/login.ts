type LoginResponse = {
  message: string;
  data: {
    user: IUser;
    token: string;
  };
};
