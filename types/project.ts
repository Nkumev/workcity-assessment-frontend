type IProject = {
  id: string;
  name: string;
  description: string;
  status: "REQUESTED" | "ACCEPTED" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
  clientId: string;
  managerId?: string;

  client: IClient;
  manager?: IUser;

  createdAt: string;
  updatedAt: string;
  completed?: string;
};
