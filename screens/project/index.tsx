"use client";

import { useProjectActions } from "@/lib/redux/reducers/project/actions";
import { ProjectTable } from "./Table";

export function ProjectScreen() {
  const { listProjects } = useProjectActions();
  listProjects();

  return (
    <main className="p-4">
      <h2 className="text-2xl font-bold">Projects</h2>
      <ProjectTable />
    </main>
  );
}
