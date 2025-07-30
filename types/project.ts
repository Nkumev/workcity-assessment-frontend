type IProject = {
  id: string;
  name: string;
  description: string;
  status: "REQUESTED" | "ACCEPTED" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
  clientId: string;
  managerId?: string;

  // client:  Client @relation(fields: [clientId], references: [id])
  // manager: User?  @relation(fields: [managerId], references: [id])

  createdAt: string;
  updatedAt: string;
  completed?: string;
};
