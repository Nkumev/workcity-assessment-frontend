type IClient = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  industry: string;

  projects?: IProject[];
  _count?: {
    projects: number;
  };

  createdAt: string;
  updatedAt: string;
};
