export const projectEndpoints = {
  base: "/v1/project",
  one: (id: string) => `/v1/project/${id}`,
  status: (id: string) => `/v1/project/status/${id}`,
};
