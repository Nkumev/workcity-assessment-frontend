type IClient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  industry: string;

  projects?: IProject[];

  createdAt: string;
  updatedAt: string;
};
