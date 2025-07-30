"use client";

import { useProjectActions } from "@/lib/redux/reducers/project/actions";
import { DashboardCards } from "./Cards";

export function DashboardScreen() {
  const { listProjects } = useProjectActions();
  listProjects();
  return (
    <main className="p-4">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="flex flex-col lg:flex-row gap-4 py-4">
        <DashboardCards />
      </div>
    </main>
  );
}
